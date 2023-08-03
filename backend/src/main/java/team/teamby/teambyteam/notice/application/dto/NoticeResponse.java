package team.teamby.teambyteam.notice.application.dto;

import team.teamby.teambyteam.member.domain.Member;
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

    public static NoticeResponse of(final Notice notice, final Member member) {
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        final String noticeCreatedAt = dateTimeFormatter.format(notice.getCreatedAt());

        return new NoticeResponse(
                notice.getId(),
                notice.getContent().getValue(),
                member.getId(),
                member.getName().getValue(),
                member.getProfileImageUrl().getValue(),
                noticeCreatedAt
        );
    }
}

