package team.teamby.teambyteam.aws.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;

@RequiredArgsConstructor
@Component
public class S3PresignedUrlProvider {

    @Value("${aws.s3.bucket}")
    private String bucket;

    private final S3Presigner s3Presigner;

    public String getImageUploadPresignedUrl(final String checkSum, final long contentLength, final String key) {
        final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .key(key)
                .bucket(bucket)
                .contentLength(contentLength)
                .checksumSHA256(checkSum)
                .build();

        final PutObjectPresignRequest putObjectPresignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(3))
                .putObjectRequest(putObjectRequest)
                .build();

        return s3Presigner.presignPutObject(putObjectPresignRequest).url().toString();
    }
}
