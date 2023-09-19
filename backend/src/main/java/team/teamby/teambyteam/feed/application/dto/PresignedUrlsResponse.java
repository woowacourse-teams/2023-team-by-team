package team.teamby.teambyteam.feed.application.dto;

import java.util.List;

public record PresignedUrlsResponse(
        List<PreSignedUrlResponse> imageUrls
) {
}
