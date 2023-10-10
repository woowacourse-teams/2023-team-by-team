package team.teamby.teambyteam.notice.application;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.filesystem.AllowedImageExtension;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.filesystem.util.FileUtil;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.notice.application.dto.NoticeImageResponse;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.notice.domain.image.NoticeImage;
import team.teamby.teambyteam.notice.domain.image.NoticeImageRepository;
import team.teamby.teambyteam.notice.domain.image.vo.ImageName;
import team.teamby.teambyteam.notice.domain.image.vo.ImageUrl;
import team.teamby.teambyteam.notice.domain.vo.Content;
import team.teamby.teambyteam.notice.exception.NoticeException;
import team.teamby.teambyteam.notice.exception.NoticeException.WritingRequestEmptyException;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private static final int LIMIT_IMAGE_SIZE = 5242880;
    private static final int LIMIT_IMAGE_COUNT = 4;
    private static final int IMAGE_EXPIRATION_DATE = 90;

    @Value("${aws.s3.image-directory}")
    private String imageDirectory;

    private final Clock clock;

    private final NoticeRepository noticeRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final NoticeImageRepository noticeImageRepository;
    private final FileCloudUploader fileCloudUploader;

    public Long register(final NoticeRegisterRequest noticeRegisterRequest,
                         final Long teamPlaceId,
                         final MemberEmailDto memberEmailDto
    ) {
        final String content = noticeRegisterRequest.content();
        final List<MultipartFile> images = noticeRegisterRequest.images();
        validateEmptyRequest(content, images);
        validateImages(images);

        checkTeamPlaceExist(teamPlaceId);
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));
        final Content contentVo = new Content(noticeRegisterRequest.content());
        final Notice savedNotice = noticeRepository.save(new Notice(contentVo, teamPlaceId, memberId.id()));
        saveImages(images, savedNotice);

        Long savedNoticeId = savedNotice.getId();
        log.info("공지 등록 - 등록자 이메일 : {}, 팀플레이스 아이디 : {}, 공지 아이디 : {}", memberEmailDto.email(), teamPlaceId,
                savedNoticeId);
        return savedNoticeId;
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new TeamPlaceException.NotFoundException(teamPlaceId);
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
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
            throw new NoticeException.ImageOverCountException(LIMIT_IMAGE_COUNT, images.size());
        }
        images.forEach(this::validateImage);
    }

    private void validateImage(final MultipartFile image) {
        if (image.getSize() > LIMIT_IMAGE_SIZE) {
            throw new NoticeException.ImageSizeException(LIMIT_IMAGE_SIZE, image.getSize());
        }
        if (AllowedImageExtension.isNotContain(FileUtil.getFileExtension(image))) {
            throw new NoticeException.NotAllowedImageExtensionException(image.getOriginalFilename());
        }
    }

    private void saveImages(final List<MultipartFile> images, final Notice savedNotice) {
        images.forEach(image -> {
            final String generatedImageUrl = fileCloudUploader.upload(image, imageDirectory + "/" + UUID.randomUUID());
            final ImageUrl imageUrl = new ImageUrl(generatedImageUrl);
            final ImageName imageName = new ImageName(image.getOriginalFilename());
            final NoticeImage noticeImage = new NoticeImage(imageUrl, imageName);
            noticeImage.confirmNotice(savedNotice);
            noticeImageRepository.save(noticeImage);
        });
    }

    @Transactional(readOnly = true)
    public Optional<NoticeResponse> findMostRecentNotice(final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        return noticeRepository.findMostRecentByTeamPlaceId(teamPlaceId)
                .map(this::mapToNoticeResponse);
    }

    private NoticeResponse mapToNoticeResponse(final Notice notice) {
        final MemberTeamPlace memberTeamPlace = memberTeamPlaceRepository
                .findByTeamPlaceIdAndMemberId(notice.getTeamPlaceId(), notice.getAuthorId())
                .orElse(MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE);
        return NoticeResponse.of(notice, memberTeamPlace, mapNoticeImageResponse(notice.getImages()));
    }

    private List<NoticeImageResponse> mapNoticeImageResponse(final List<NoticeImage> images) {
        return images.stream()
                .map(image ->
                        new NoticeImageResponse(
                                image.getId(),
                                isExpired(image.getCreatedAt()),
                                image.getImageNameValue(),
                                image.getImageUrlValue())
                ).toList();
    }

    private boolean isExpired(final LocalDateTime createdAt) {
        return createdAt.plusDays(IMAGE_EXPIRATION_DATE).isBefore(LocalDateTime.now(clock));
    }
}
