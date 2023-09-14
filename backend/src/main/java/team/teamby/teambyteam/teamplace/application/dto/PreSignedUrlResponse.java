package team.teamby.teambyteam.teamplace.application.dto;

import jakarta.validation.constraints.NotBlank;

public record PreSignedUrlResponse(
        @NotBlank String imageName,
        @NotBlank String url
) {
}
