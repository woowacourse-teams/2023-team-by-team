package team.teamby.teambyteam.aws.s3.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class S3Configuration {

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.cloud-front.domain}")
    private String cloudFrontDomain;

    @Bean
    public S3Presigner s3Presigner() throws URISyntaxException {
        return S3Presigner.builder()
                .region(Region.of(region))
                .endpointOverride(new URI(cloudFrontDomain))
                .build();
    }
}
