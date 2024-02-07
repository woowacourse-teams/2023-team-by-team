package team.teamby.teambyteam.feed.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

public record FeedResponse(
        Long id,
        String type,
        Long authorId,
        String authorName,
        String profileImageUrl,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,
        String content,
        List<FeedImageResponse> images,
        Boolean isMe
) {

    public static FeedResponse from(final Feed feed, final String authorName, final String profileImageUrl) {
        return new FeedResponse(
                feed.getId(),
                feed.getType().name().toLowerCase(),
                feed.getAuthorId(),
                authorName,
                profileImageUrl,
                feed.getCreatedAt(),
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
        return new FeedResponse(
                feed.getId(),
                feed.getType().name().toLowerCase(),
                threadAuthorInfo.findMemberId(),
                threadAuthorInfo.getDisplayMemberName().getValue(),
                threadAuthorInfo.findMemberProfileImageUrl(),
                feed.getCreatedAt(),
                feed.getContent().getValue(),
                images,
                threadAuthorInfo.isEmailEqual(loginMemberEmail)
        );
    }
}
