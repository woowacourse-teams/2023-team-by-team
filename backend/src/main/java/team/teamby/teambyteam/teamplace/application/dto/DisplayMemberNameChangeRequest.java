package team.teamby.teambyteam.teamplace.application.dto;

import jakarta.validation.constraints.NotBlank;

public record DisplayMemberNameChangeRequest(
        @NotBlank(message = "사용자의 이름은 공백일 수 없습니다.")
        String name
) {
}
