package team.teamby.teambyteam.notice.domain;

import java.util.Arrays;

public enum AllowedImageExtension {

    JPG, JPEG, PNG, WEBP, SVG, AI, BMP, AVIF;

    public static boolean isNotContain(final String imageExtension) {
        final String upperCase = imageExtension.toUpperCase();

        return Arrays.stream(values())
                .noneMatch(allowedImageExtension -> allowedImageExtension.name().equals(upperCase));
    }
}
