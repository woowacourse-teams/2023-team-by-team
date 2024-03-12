package team.teamby.teambyteam.feed.application.dto;

import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;

public record FeedImageResponse(
        Long id,
        Boolean isExpired,
        String name,
        String url
) {

    public static FeedImageResponse from(final FeedThreadImage feedThreadImage) {
        return new FeedImageResponse(
                feedThreadImage.getId(),
                feedThreadImage.isExpired(),
                feedThreadImage.getImageName().getValue(),
                feedThreadImage.getImageUrl().getValue()
        );
    }
}
