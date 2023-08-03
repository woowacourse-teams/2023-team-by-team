package team.teamby.teambyteam.feed.application.dto;

import team.teamby.teambyteam.feed.domain.Feed;

import java.time.format.DateTimeFormatter;

public record FeedResponse(
        Long id,
        String type,
        Long authorId,
        String authorName,
        String profileImageUrl,
        String createdAt,
        String content
) {
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public static FeedResponse from(final Feed feed, final String authorName, final String profileImageUrl) {
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        String createdAt = feed.getCreatedAt().format(dateTimeFormatter);

        return new FeedResponse(
                feed.getId(),
                feed.getType().name().toLowerCase(),
                feed.getAuthorId(),
                authorName,
                profileImageUrl,
                createdAt,
                feed.getContent().getValue()
        );
    }
}
