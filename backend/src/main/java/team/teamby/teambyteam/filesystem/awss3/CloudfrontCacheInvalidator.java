package team.teamby.teambyteam.filesystem.awss3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.services.cloudfront.CloudFrontClient;
import software.amazon.awssdk.services.cloudfront.model.CreateInvalidationRequest;
import software.amazon.awssdk.services.cloudfront.model.CreateInvalidationResponse;
import software.amazon.awssdk.services.cloudfront.model.Invalidation;
import software.amazon.awssdk.services.cloudfront.model.InvalidationBatch;
import software.amazon.awssdk.services.cloudfront.model.Paths;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class CloudfrontCacheInvalidator {

    private static final String COMPLETED = "Completed";
    private static final String CREATE_INVALIDATION_RESULT_LOG_FORMAT = "CloudFront create invalidation - id : {} , status : {}";

    private final CloudFrontClient cloudFrontClient;

    @Value("${aws.cloud-front.asset-distribution-id}")
    private String distributionId;

    public void createInvalidation(final String... paths) {

        final InvalidationBatch invalidationBatch = createInvalidationBatch(paths);
        final CreateInvalidationRequest request = createInvalidationRequest(invalidationBatch);
        final CreateInvalidationResponse response = cloudFrontClient.createInvalidation(request);

        logResult(response);
    }

    private CreateInvalidationRequest createInvalidationRequest(InvalidationBatch invalidationBatch) {
        return CreateInvalidationRequest.builder()
                .distributionId(distributionId)
                .invalidationBatch(invalidationBatch)
                .build();
    }

    private InvalidationBatch createInvalidationBatch(String[] paths) {
        final List<String> items = List.of(paths);
        return InvalidationBatch.builder()
                .paths(
                        Paths.builder()
                                .items(items)
                                .quantity(items.size())
                                .build()
                )
                .callerReference(UUID.randomUUID().toString())
                .build();
    }

    private void logResult(CreateInvalidationResponse response) {
        final Invalidation invalidation = response.invalidation();
        final String status = invalidation.status();
        if (status.equals(COMPLETED)) {
            log.info(CREATE_INVALIDATION_RESULT_LOG_FORMAT, invalidation.id(), status);
            return;
        }
        log.error(CREATE_INVALIDATION_RESULT_LOG_FORMAT, invalidation.id(), status);
    }
}
