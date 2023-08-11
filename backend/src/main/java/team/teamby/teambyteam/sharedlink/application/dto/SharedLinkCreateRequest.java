package team.teamby.teambyteam.sharedlink.application.dto;

import jakarta.validation.constraints.NotBlank;

public record SharedLinkCreateRequest(
        @NotBlank(message = "공유 링크의 제목은 공백일 수 없습니다.") String title,
        @NotBlank(message = "공유 링크의 링크는 공백일 수 없습니다.") String url
) {
}
