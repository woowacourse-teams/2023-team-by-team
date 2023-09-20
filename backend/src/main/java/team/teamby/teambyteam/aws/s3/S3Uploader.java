package team.teamby.teambyteam.aws.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class S3Uploader {

    @Value("${aws.s3.bucket}")
    private String bucket;

    private final S3Client s3Client;

    public void imageUpload(final MultipartFile multipartFile, final String key) {
        try {
            final RequestBody requestBody = RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize());
            final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .key(key)
                    .bucket(bucket)
                    .build();

            s3Client.putObject(putObjectRequest, requestBody);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
