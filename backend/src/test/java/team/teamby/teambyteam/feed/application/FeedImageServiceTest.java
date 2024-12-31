package team.teamby.teambyteam.feed.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;
import team.teamby.teambyteam.feed.application.dto.UploadImageRequest;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImageRepository;
import team.teamby.teambyteam.feed.domain.image.Status;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.filesystem.exception.ImageSizeException;
import team.teamby.teambyteam.filesystem.exception.NotAllowedImageExtensionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.IMAGE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.NOT_ALLOWED_IMAGE_EXTENSION_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.OVER_IMAGE_SIZE_REQUEST;

class FeedImageServiceTest extends ServiceTest {

    @Autowired
    private FeedImageService feedImageService;

    @Autowired
    private FeedThreadImageRepository feedThreadImageRepository;

    @MockBean
    private FileStorageManager fileStorageManager;

    @BeforeEach
    void setup() {
        given(fileStorageManager.upload(any(MultipartFile.class), any(String.class), any(String.class)))
                .willReturn("https://s3://seongha-seeik");
    }

    @Test
    @DisplayName("이미지 업로드가 정상적으로 성공한다.")
    void uploadImages() {
        // given
        final UploadImageRequest request = IMAGE_REQUEST;

        // when
        final var result = feedImageService.uploadImages(request);

        // then
        final FeedImageResponse imageResponse = result.get(0);
        final FeedThreadImage savedImage = feedThreadImageRepository.findById(imageResponse.id()).orElseThrow();

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(result).isNotEmpty();
            softly.assertThat(imageResponse.url()).isEqualTo("https://s3://seongha-seeik");
            softly.assertThat(imageResponse.isExpired()).isFalse();
            softly.assertThat(savedImage.getStatus()).isEqualTo(Status.PENDING);
        });
    }

    @Test
    @DisplayName("이미지 크기가 허용된 크기보다 많으면 예외가 발생한다.")
    void failWhenOverImageSize() {
        // given
        final UploadImageRequest request = OVER_IMAGE_SIZE_REQUEST;

        // when & then
        assertThatThrownBy(() -> feedImageService.uploadImages(request))
                .isInstanceOf(ImageSizeException.class)
                .hasMessageContaining("허용된 이미지의 크기를 초과했습니다.");
    }

    @Test
    @DisplayName("이미지 확장자가 허용되지 않으면 예외가 발생한다.")
    void failWhenNotAllowedImageExtension() {
        // given
        final UploadImageRequest request = NOT_ALLOWED_IMAGE_EXTENSION_REQUEST;

        // when & then
        assertThatThrownBy(() -> feedImageService.uploadImages(request))
                .isInstanceOf(NotAllowedImageExtensionException.class)
                .hasMessageContaining("허용되지 않은 확장자입니다.");
    }
}
