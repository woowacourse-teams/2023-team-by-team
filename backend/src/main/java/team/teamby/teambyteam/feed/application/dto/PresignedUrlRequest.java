package team.teamby.teambyteam.feed.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PresignedUrlRequest(
        @NotBlank String imageName,
        @Size(min = 1, max = FIVE_MB) long contentLength,
        @NotBlank String checkSum
) {
    private static final int FIVE_MB = 5242880;
}
