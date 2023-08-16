package team.teamby.teambyteam.notice.application.dto;

import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.notice.domain.Notice;

import java.time.format.DateTimeFormatter;

public record NoticeResponse(
        Long id,
        String content,
        Long authorId,
        String authorName,
        String profileImageUrl,
        String createdAt
) {
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public static NoticeResponse of(final Notice notice, final MemberTeamPlace memberTeamPlace) {
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        final String noticeCreatedAt = dateTimeFormatter.format(notice.getCreatedAt());

        return new NoticeResponse(
                notice.getId(),
                notice.getContent().getValue(),
                memberTeamPlace.findMemberId(),
                memberTeamPlace.getDisplayMemberName().getValue(),
                memberTeamPlace.findMemberProfileImageUrl(),
                noticeCreatedAt
        );
    }
}

