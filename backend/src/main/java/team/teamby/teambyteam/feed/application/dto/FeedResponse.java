package team.teamby.teambyteam.feed.application.dto;

import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.cache.RecentFeedCache;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;

import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

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
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);

    public static FeedResponse from(final Feed feed, final String authorName, final String profileImageUrl) {
        final String createdAt = feed.getCreatedAt().format(DATE_TIME_FORMATTER);

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

    public static FeedResponse from(
            final Feed feed,
            final MemberTeamPlace threadAuthorInfo,
            final List<FeedImageResponse> images,
            final String loginMemberEmail
    ) {
        final String createdAt = feed.getCreatedAt().format(DATE_TIME_FORMATTER);

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

    public static FeedResponse from(
            final RecentFeedCache.FeedCache cache,
            final MemberTeamPlace authorInfo,
            final IdOnly memberId
    ) {
        return new FeedResponse(
                cache.id(),
                cache.type(),
                cache.authorId(),
                authorInfo.getDisplayMemberNameValue(),
                authorInfo.findMemberProfileImageUrl(),
                cache.createdAt().format(DATE_TIME_FORMATTER),
                cache.content(),
                cache.images()
                        .stream()
                        .map(FeedImageResponse::from)
                        .toList(),
                Objects.equals(cache.authorId(), memberId.id())
        );
    }
}
