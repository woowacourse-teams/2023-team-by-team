package team.teamby.teambyteam.member.application.dto;

import jakarta.validation.constraints.NotBlank;

public record MemberUpdateRequest(
        @NotBlank(message = "회원명은 빈 값일 수 없습니다.")
        String name
) {
}
