package team.teamby.teambyteam.feed.application.dto;

import jakarta.validation.constraints.NotBlank;

public record PreSignedUrlResponse(
        @NotBlank String imageName,
        @NotBlank String url
) {
}
