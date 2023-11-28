package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.application.event.FeedEvent;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.domain.cache.RecentFeedCache;
import team.teamby.teambyteam.feed.domain.cache.RecentFeedCache.FeedCache;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImageRepository;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.feed.exception.FeedException;
import team.teamby.teambyteam.feed.exception.FeedException.WritingRequestEmptyException;
import team.teamby.teambyteam.filesystem.AllowedImageExtension;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.filesystem.util.FileUtil;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FeedThreadService {

    public static final String BLANK_PROFILE_IMAGE_URL = "";
    private static final String SORT_CRITERIA = "id";
    private static final Sort.Direction SORT_DIRECTION = Sort.Direction.DESC;
    private static final int FIRST_PAGE = 0;
    public static final String AUTHOR_NAME_SCHEDULE = "schedule";
    private static final int LIMIT_IMAGE_SIZE = 5242880;
    private static final int LIMIT_IMAGE_COUNT = 4;
    private static final int IMAGE_EXPIRATION_DATE = 90;

    @Value("${aws.s3.image-directory}")
    private String imageDirectory;

    private final Clock clock;

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final FeedThreadImageRepository feedThreadImageRepository;
    private final RecentFeedCache feedCache;

    private final FileStorageManager fileStorageManager;

    private final ApplicationEventPublisher applicationEventPublisher;

    public Long write(
            final FeedThreadWritingRequest feedThreadWritingRequest,
            final MemberEmailDto memberEmailDto,
            final Long teamPlaceId
    ) {
        final String content = feedThreadWritingRequest.content();
        final List<MultipartFile> images = feedThreadWritingRequest.images();
        validateEmptyRequest(content, images);
        validateImages(images);

        final Long memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()))
                .id();

        final FeedThread savedFeedThread = feedRepository.save(new FeedThread(teamPlaceId, new Content(content), memberId));
        saveImages(images, savedFeedThread);

        final Long threadId = savedFeedThread.getId();
        log.info("스레드 생성 - 생성자 이메일 : {}, 스레드 아이디 : {}", memberEmailDto.email(), threadId);

        // TODO : 캐시 고치고 추가
//        feedCache.addCache(teamPlaceId, FeedCache.from(savedFeedThread));

        sendFeedWritingEvent(memberEmailDto, teamPlaceId, memberId, savedFeedThread);

        return threadId;
    }

    private void validateEmptyRequest(final String content, final List<MultipartFile> images) {
        if (isEmptyRequest(content, images)) {
            throw new WritingRequestEmptyException();
        }
    }

    private boolean isEmptyRequest(final String content, final List<MultipartFile> images) {
        return (("".equals(content) || Objects.isNull(content)) && images.size() == 0);
    }

    private void validateImages(final List<MultipartFile> images) {
        if (images.size() > LIMIT_IMAGE_COUNT) {
            throw new FeedException.ImageOverCountException(LIMIT_IMAGE_COUNT, images.size());
        }
        images.forEach(this::validateImage);
    }

    private void validateImage(final MultipartFile image) {
        if (image.getSize() > LIMIT_IMAGE_SIZE) {
            throw new FeedException.ImageSizeException(LIMIT_IMAGE_SIZE, image.getSize());
        }
        if (AllowedImageExtension.isNotContain(FileUtil.getFileExtension(image))) {
            throw new FeedException.NotAllowedImageExtensionException(image.getOriginalFilename());
        }
    }

    private void saveImages(final List<MultipartFile> images, final FeedThread savedFeedThread) {
        images.forEach(image -> {
            final String originalFilename = image.getOriginalFilename();
            final String generatedImageUrl = fileStorageManager.upload(image, imageDirectory + "/" + UUID.randomUUID(), originalFilename);
            final ImageUrl imageUrl = new ImageUrl(generatedImageUrl);
            final ImageName imageName = new ImageName(originalFilename);
            final FeedThreadImage feedThreadImage = new FeedThreadImage(imageUrl, imageName);
            feedThreadImage.confirmFeedThread(savedFeedThread);
            feedThreadImageRepository.save(feedThreadImage);
        });
    }

    private void sendFeedWritingEvent(
            final MemberEmailDto memberEmailDto,
            final Long teamPlaceId,
            final Long memberId,
            final FeedThread savedFeedThread
    ) {
        final MemberTeamPlace threadAuthorInfo = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlaceId, memberId)
                .orElseThrow(() -> new IllegalArgumentException(String.format("멤버-팀플레이스 조회 실패 memberId : %d, teamPlaceId %d", memberId, teamPlaceId)));
        applicationEventPublisher.publishEvent(new FeedEvent(teamPlaceId,
                FeedResponse.from(savedFeedThread, threadAuthorInfo, mapToFeedImageResponse(savedFeedThread), memberEmailDto.email())
        ));
    }

    @Transactional(readOnly = true)
    public FeedsResponse firstRead(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final Integer size) {

//        final List<FeedResponse> feedResponses = getRecentFeedResponses(teamPlaceId, memberEmailDto, size);
        final List<FeedResponse> feedResponses = getFeedResponsesFromDatasource(teamPlaceId, memberEmailDto, size);

        return FeedsResponse.of(feedResponses);
    }

    private List<FeedResponse> getRecentFeedResponses(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final Integer size) {
        if (feedCache.isCached(teamPlaceId, size)) {
            return getFeedResponsesFromCache(teamPlaceId, memberEmailDto, size);
        }
        return getFeedResponsesFromDatasource(teamPlaceId, memberEmailDto, size);
    }

    private List<FeedResponse> getFeedResponsesFromCache(Long teamPlaceId, MemberEmailDto memberEmailDto, Integer size) {
        final Map<Long, MemberTeamPlace> teamPlaceMembers = getTeamPlaceMembers(teamPlaceId);
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));

        final List<FeedCache> caches = feedCache.getCache(teamPlaceId, size);
        return caches.stream()
                .map(cache -> FeedResponse.from(
                        cache,
                        teamPlaceMembers.getOrDefault(cache.authorId(), MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE),
                        memberId)
                )
                .toList();
    }

    private List<FeedResponse> getFeedResponsesFromDatasource(
            final Long teamPlaceId,
            final MemberEmailDto memberEmailDto,
            final Integer size
    ) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceId(teamPlaceId, pageSize);
        return mapFeedResponses(list, memberEmailDto.email(), teamPlaceId);
    }

    @Transactional(readOnly = true)
    public FeedsResponse reRead(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final Long feedId,
                                final Integer size) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceIdAndIdLessThan(teamPlaceId, feedId, pageSize);
        final List<FeedResponse> feedResponses = mapFeedResponses(list, memberEmailDto.email(), teamPlaceId);

        return FeedsResponse.of(feedResponses);
    }

    private Pageable getPageableInitSize(final Integer size) {
        return PageRequest.of(FIRST_PAGE, size, SORT_DIRECTION, SORT_CRITERIA);
    }

    private List<FeedResponse> mapFeedResponses(final List<Feed> feeds, final String loginMemberEmail,
                                                final Long teamPlaceId) {
        final Map<Long, MemberTeamPlace> teamPlaceMembers = getTeamPlaceMembers(teamPlaceId);
        return feeds.stream()
                .map(feed -> mapToResponse(
                        feed,
                        teamPlaceMembers.getOrDefault(feed.getAuthorId(), MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE),
                        loginMemberEmail))
                .toList();
    }

    private Map<Long, MemberTeamPlace> getTeamPlaceMembers(final Long teamPlaceId) {
        return memberTeamPlaceRepository.findAllByTeamPlaceId(teamPlaceId).stream()
                .collect(Collectors.toMap(
                        MemberTeamPlace::findMemberId,
                        memberTeamPlace -> memberTeamPlace
                ));
    }

    private FeedResponse mapToResponse(final Feed feed, final MemberTeamPlace author, final String loginMemberEmail) {
        if (FeedType.THREAD == feed.getType()) {
            return FeedResponse.from(feed, author, mapToFeedImageResponse((FeedThread) feed), loginMemberEmail);
        }
        if (FeedType.NOTIFICATION == feed.getType()) {
            return FeedResponse.from(feed, AUTHOR_NAME_SCHEDULE, BLANK_PROFILE_IMAGE_URL);
        }
        throw new IllegalArgumentException("지원하지 않는 타입입니다.");
    }

    private List<FeedImageResponse> mapToFeedImageResponse(final FeedThread feedThread) {
        final List<FeedThreadImage> images = feedThread.getImages();
        return images.stream().map(feedThreadImage ->
                        new FeedImageResponse(
                                feedThreadImage.getId(),
                                isExpired(feedThreadImage.getCreatedAt()),
                                feedThreadImage.getImageName().getValue(),
                                feedThreadImage.getImageUrl().getValue()))
                .toList();
    }

    private boolean isExpired(final LocalDateTime createdAt) {
        return createdAt.plusDays(IMAGE_EXPIRATION_DATE).isBefore(LocalDateTime.now(clock));
    }
}
