package team.teamby.teambyteam.feed.presentation.sse.dto;

import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;

import java.util.List;

public record FeedImagesResponse(
        List<FeedImageResponse> images
) {
}
