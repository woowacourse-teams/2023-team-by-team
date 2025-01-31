package team.teamby.teambyteam.feed.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import team.teamby.teambyteam.feed.domain.Feed;

import java.time.LocalDateTime;
import java.util.List;

public record FeedWebsocketResponse(
        Long id,
        Long authorId,
        String authorName,
        String profileImageUrl,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,
        String content,
        List<FeedImageResponse> images) {

    public static FeedWebsocketResponse from(
            final Feed feed,
            final String authorName,
            final String profileImageUrl,
            final List<FeedImageResponse> images) {
        return new FeedWebsocketResponse(
                feed.getId(),
                feed.getAuthorId(),
                authorName,
                profileImageUrl,
                feed.getCreatedAt(),
                feed.getContent().getValue(),
                images
        );
    }
}
