package team.teamby.teambyteam.notice.application.dto;

public record NoticeImageResponse(
        Long id,
        Boolean isExpired,
        String name,
        String url
) {
}
