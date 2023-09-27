package team.teamby.teambyteam.feed.application;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.AllowedImageExtension;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImageRepository;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.feed.exception.FeedException;
import team.teamby.teambyteam.feed.exception.FeedException.WritingRequestEmptyException;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

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

    @Value("${aws.s3.image-directory}")
    private String imageDirectory;

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final FeedThreadImageRepository feedThreadImageRepository;

    private final FileCloudUploader fileCloudUploader;

    public Long write(
            final FeedThreadWritingRequest feedThreadWritingRequest,
            final MemberEmailDto memberEmailDto,
            final Long teamPlaceId
    ) {

        final String content = feedThreadWritingRequest.content();
        List<MultipartFile> images = feedThreadWritingRequest.images();
        validateEmptyRequest(content, images);
        validateImages(images);

        final Content contentVo = new Content(content);
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));
        final FeedThread feedThread = new FeedThread(teamPlaceId, contentVo, memberId.id());
        final FeedThread savedFeedThread = feedRepository.save(feedThread);

        images.forEach(image -> {
            final String generatedImageUrl = fileCloudUploader.upload(image, imageDirectory + "/" + UUID.randomUUID());
            final ImageUrl imageUrl = new ImageUrl(generatedImageUrl);
            final ImageName imageName = new ImageName(image.getOriginalFilename());
            final FeedThreadImage feedThreadImage = new FeedThreadImage(imageUrl, imageName);
            feedThreadImage.confirmFeedThread(savedFeedThread);
            feedThreadImageRepository.save(feedThreadImage);
        });
        Long threadId = feedThread.getId();
        log.info("스레드 생성 - 생성자 이메일 : {}, 스레드 아이디 : {}", memberEmailDto.email(), threadId);

        return threadId;
    }

    private void validateEmptyRequest(final String content, final List<MultipartFile> images) {
        if (isEmptyRequest(content, images)) {
            throw new WritingRequestEmptyException();
        }
    }

    private boolean isEmptyRequest(final String content, final List<MultipartFile> images) {
        return ((content.equals("") || Objects.isNull(content)) && images.size() == 0);
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
        if (AllowedImageExtension.isNotContain(getFileExtension(image))) {
            throw new FeedException.NotAllowedImageExtensionException(image.getOriginalFilename());
        }
    }

    private String getFileExtension(MultipartFile file) {
        final String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex >= 0 && dotIndex < originalFilename.length() - 1) {
                return originalFilename.substring(dotIndex + 1);
            }
        }

        throw new FeedException.NotFoundImageExtensionException(originalFilename);
    }

    @Transactional(readOnly = true)
    public FeedsResponse firstRead(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final Integer size) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceId(teamPlaceId, pageSize);
        final List<FeedResponse> feedResponses = mapFeedResponses(list, memberEmailDto.email(), teamPlaceId);

        return FeedsResponse.of(feedResponses);
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
                        loginMemberEmail)
                )
                .toList();
    }

    private Map<Long, MemberTeamPlace> getTeamPlaceMembers(final Long teamPlaceId) {
        return memberTeamPlaceRepository.findAllByTeamPlaceId(teamPlaceId).stream()
                .collect(Collectors.toMap(
                        MemberTeamPlace::findMemberId,
                        e -> e
                ));
    }

    private FeedResponse mapToResponse(final Feed feed, final MemberTeamPlace author, final String loginMemberEmail) {
        if (FeedType.THREAD == feed.getType()) {
            return FeedResponse.from(feed, author, loginMemberEmail);
        }
        if (FeedType.NOTIFICATION == feed.getType()) {
            return FeedResponse.from(feed, AUTHOR_NAME_SCHEDULE, BLANK_PROFILE_IMAGE_URL);
        }
        throw new IllegalArgumentException("지원하지 않는 타입입니다.");
    }
}
