package team.teamby.teambyteam.filesystem.awss3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import team.teamby.teambyteam.filesystem.FileCloudUploader;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@RequiredArgsConstructor
public class S3Uploader implements FileCloudUploader {

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.asset-root-directory}")
    private String assetRootDirectory;

    @Value("${aws.cloud-front.domain}")
    private String cloudFrontBaseDomain;

    private final S3Client s3Client;

    @Override
    public String upload(final MultipartFile multipartFile, final String directoryPath) {
        try {
            final RequestBody requestBody = RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize());
            return uploadFile(directoryPath, requestBody);
        } catch (IOException e) {
            log.error("MultiPartFile - S3업로드 예외", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String upload(final byte[] content, final String directoryPath) {
        try (InputStream inputStream = new ByteArrayInputStream(content)) {
            final RequestBody requestBody = RequestBody.fromInputStream(inputStream, content.length);
            return uploadFile(directoryPath, requestBody);
        } catch (IOException e) {
            log.error("byte array s3업로드 예외", e);
            throw new RuntimeException(e);
        }
    }

    private String uploadFile(final String directoryPath, final RequestBody requestBody) {
        final String uploadPath = assetRootDirectory + directoryPath;
        final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .key(uploadPath)
                .bucket(bucket)
                .build();

        s3Client.putObject(putObjectRequest, requestBody);
        return cloudFrontBaseDomain + uploadPath;
    }
}
