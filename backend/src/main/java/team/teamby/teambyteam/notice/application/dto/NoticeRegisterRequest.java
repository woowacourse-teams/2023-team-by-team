package team.teamby.teambyteam.notice.application.dto;

import jakarta.validation.constraints.NotBlank;

public record NoticeRegisterRequest(
        @NotBlank(message = "공지 내용은 빈 값일 수 없습니다.")
        String content
) {
}
