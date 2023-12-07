package team.teamby.teambyteam.feed.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.event.FeedEvent;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImageRepository;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.feed.exception.FeedException;
import team.teamby.teambyteam.filesystem.AllowedImageExtension;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.filesystem.util.FileUtil;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FeedWriteService {

    private static final int LIMIT_IMAGE_SIZE = 5242880;
    private static final int LIMIT_IMAGE_COUNT = 4;

    private final ApplicationEventPublisher applicationEventPublisher;
    private final FeedRepository feedRepository;
    private final FeedThreadImageRepository feedThreadImageRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final FileStorageManager fileStorageManager;

    @Value("${aws.s3.image-directory}")
    private String imageDirectory;

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

        sendFeedWritingEvent(memberEmailDto, teamPlaceId, memberId, savedFeedThread);

        return threadId;
    }

    private void validateEmptyRequest(final String content, final List<MultipartFile> images) {
        if (isEmptyRequest(content, images)) {
            throw new FeedException.WritingRequestEmptyException();
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

    private List<FeedImageResponse> mapToFeedImageResponse(final FeedThread feedThread) {
        final List<FeedThreadImage> images = feedThread.getImages();
        return images.stream().map(feedThreadImage ->
                        new FeedImageResponse(
                                feedThreadImage.getId(),
                                feedThreadImage.isExpired(),
                                feedThreadImage.getImageName().getValue(),
                                feedThreadImage.getImageUrl().getValue()))
                .toList();
    }
}
