package team.teamby.teambyteam.feed.application.dto;

import jakarta.validation.constraints.NotBlank;

public record FeedThreadWritingRequest(
        @NotBlank(message = "스레드 내용이 있어야 합니다.")
        String content
) {
}
