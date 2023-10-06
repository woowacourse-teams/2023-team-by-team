package team.teamby.teambyteam.filesystem.awss3.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cloudfront.CloudFrontClient;
import software.amazon.awssdk.services.s3.S3Client;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.filesystem.awss3.CloudfrontCacheInvalidator;
import team.teamby.teambyteam.filesystem.awss3.S3Uploader;

@Configuration
public class S3Configuration {

    @Value("${aws.s3.region}")
    private String region;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }

    @Bean
    public FileCloudUploader fileCloudUploader() {
        return new S3Uploader(s3Client(), cloudfrontCacheInvalidator());
    }

    @Bean
    public CloudfrontCacheInvalidator cloudfrontCacheInvalidator() {
        return new CloudfrontCacheInvalidator(CloudFrontClient.builder()
                .build());
    }
}
