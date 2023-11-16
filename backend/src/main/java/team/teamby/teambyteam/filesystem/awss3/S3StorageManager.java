package team.teamby.teambyteam.filesystem.awss3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import team.teamby.teambyteam.filesystem.FileStorageManager;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

@Slf4j
@RequiredArgsConstructor
public class S3StorageManager implements FileStorageManager {

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.asset-root-directory}")
    private String assetRootDirectory;

    @Value("${aws.cloud-front.domain}")
    private String cloudFrontBaseDomain;

    private final S3Client s3Client;
    private final CloudfrontCacheInvalidator cloudfrontCacheInvalidator;

    @Override
    public String upload(final MultipartFile multipartFile, final String nameAndPathToSave, final String originalFileName) {
        try {
            final RequestBody requestBody = RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize());
            final MediaType mediaType = MediaType.parseMediaType(Files.probeContentType(Paths.get(originalFileName)));
            final String uploadedUrl = uploadFile(nameAndPathToSave, requestBody, mediaType);
            log.info("file uploaded : {} , published : {}", assetRootDirectory + nameAndPathToSave, uploadedUrl);
            return uploadedUrl;
        } catch (IOException e) {
            log.error("MultiPartFile - S3업로드 예외", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String upload(final byte[] content, final String nameAndPathToSave, final String originalFileName) {
        try (InputStream inputStream = new ByteArrayInputStream(content)) {
            final RequestBody requestBody = RequestBody.fromInputStream(inputStream, content.length);
            final MediaType mediaType = MediaType.parseMediaType(Files.probeContentType(Paths.get(originalFileName)));
            final String uploadedUrl = uploadFile(nameAndPathToSave, requestBody, mediaType);
            log.info("file uploaded : {} , published : {}", assetRootDirectory + nameAndPathToSave, uploadedUrl);
            return uploadedUrl;
        } catch (IOException e) {
            log.error("byte array s3업로드 예외", e);
            throw new RuntimeException(e);
        }
    }

    private String uploadFile(final String directoryPath, final RequestBody requestBody, final MediaType mediaType) {
        final String uploadPath = assetRootDirectory + directoryPath;
        final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .key(uploadPath)
                .contentType(mediaType.toString())
                .bucket(bucket)
                .build();

        s3Client.putObject(putObjectRequest, requestBody);

        cloudfrontCacheInvalidator.createInvalidation(directoryPath);

        return cloudFrontBaseDomain + directoryPath;
    }

    @Override
    public boolean delete(final String fileNameAdnPath) {
        try {
            final DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(assetRootDirectory + fileNameAdnPath)
                    .build();
            s3Client.deleteObject(deleteRequest);
            return true;
        } catch (final SdkClientException exception) {
            log.error("s3삭제 에러 - sdk client side 예외 발생", exception);
        } catch (AwsServiceException exception) {
            log.error("s3삭제 에러 - s3 서비스 예외 발생", exception);
        }
        return false;
    }
}
