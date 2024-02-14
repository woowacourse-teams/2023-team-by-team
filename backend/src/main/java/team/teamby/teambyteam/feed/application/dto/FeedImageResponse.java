package team.teamby.teambyteam.feed.application.dto;

public record FeedImageResponse(
        Long id,
        Boolean isExpired,
        String name,
        String url
) {
}
