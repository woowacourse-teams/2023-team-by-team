package team.teamby.teambyteam.teamplace.application.dto;

import jakarta.validation.constraints.NotBlank;

public record TeamPlaceCreateRequest(
        @NotBlank(message = "팀플레이스 이름이 있어야 합니다.") String name
) {
}
