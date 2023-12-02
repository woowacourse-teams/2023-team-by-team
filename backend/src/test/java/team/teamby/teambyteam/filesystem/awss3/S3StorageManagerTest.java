package team.teamby.teambyteam.filesystem.awss3;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import team.teamby.teambyteam.filesystem.FileStorageManager;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class S3StorageManagerTest {

    @MockBean
    private S3Client s3Client;

    @Autowired
    private FileStorageManager fileStorageManager;

    @Value("${aws.s3.asset-root-directory}")
    private String assetRootDirectory;

    @Value("${aws.cloud-front.domain}")
    private String cloudFrontBaseDomain;

    @Test
    @DisplayName("도메인으로 파일 삭제 요청시 디렉터리 주소로 삭제요청 테스트")
    void deleteWithDirectoryPath() {
        // given
        given(s3Client.deleteObject(any(DeleteObjectRequest.class)))
                .willReturn(null);
        final String filePath = "/test/here.txt";

        // when
        fileStorageManager.delete(cloudFrontBaseDomain + filePath);

        // then
        final ArgumentCaptor<DeleteObjectRequest> requestCaptor = ArgumentCaptor.forClass(DeleteObjectRequest.class);
        verify(s3Client).deleteObject(requestCaptor.capture());
        final DeleteObjectRequest request = requestCaptor.getValue();

        final String actualPath = request.key();
        assertThat(actualPath).isEqualTo(assetRootDirectory + filePath);
    }
}
