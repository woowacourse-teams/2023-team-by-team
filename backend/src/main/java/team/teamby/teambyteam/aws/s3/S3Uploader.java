package team.teamby.teambyteam.aws.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

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
            final String uploadPath = assetRootDirectory + directoryPath;
            final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .key(uploadPath)
                    .bucket(bucket)
                    .build();

            s3Client.putObject(putObjectRequest, requestBody);
            return cloudFrontBaseDomain + uploadPath;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
