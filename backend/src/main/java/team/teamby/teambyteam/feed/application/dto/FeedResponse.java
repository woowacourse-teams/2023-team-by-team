package team.teamby.teambyteam.feed.application.dto;

import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;

import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

public record FeedResponse(
        Long id,
        String type,
        Long authorId,
        String authorName,
        String profileImageUrl,
        String createdAt,
        String content,
        List<FeedImageResponse> images,
        Boolean isMe
) {
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public static FeedResponse from(final Feed feed, final String authorName, final String profileImageUrl) {
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        final String createdAt = feed.getCreatedAt().format(dateTimeFormatter);

        return new FeedResponse(
                feed.getId(),
                feed.getType().name().toLowerCase(),
                feed.getAuthorId(),
                authorName,
                profileImageUrl,
                createdAt,
                feed.getContent().getValue(),
                Collections.emptyList(),
                false
        );
    }

    public static FeedResponse from(final Feed feed, final MemberTeamPlace threadAuthorInfo, final List<FeedImageResponse> images, final String loginMemberEmail) {
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        final String createdAt = feed.getCreatedAt().format(dateTimeFormatter);

        return new FeedResponse(
                feed.getId(),
                feed.getType().name().toLowerCase(),
                threadAuthorInfo.findMemberId(),
                threadAuthorInfo.getDisplayMemberName().getValue(),
                threadAuthorInfo.findMemberProfileImageUrl(),
                createdAt,
                feed.getContent().getValue(),
                images,
                threadAuthorInfo.isEmailEqual(loginMemberEmail)
        );
    }
}
