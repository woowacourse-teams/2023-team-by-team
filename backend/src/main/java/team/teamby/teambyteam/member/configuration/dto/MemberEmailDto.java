package team.teamby.teambyteam.member.configuration.dto;

import jakarta.validation.constraints.NotBlank;

public record MemberEmailDto(
        @NotBlank(message = "이메일은 공백이 될 수 없습니다.")
        String email
) {
}
