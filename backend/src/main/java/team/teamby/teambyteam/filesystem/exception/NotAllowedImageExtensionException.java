package team.teamby.teambyteam.filesystem.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class NotAllowedImageExtensionException extends CustomBadRequestException {
    public NotAllowedImageExtensionException(final String imageName) {
        super(String.format("허용되지 않은 확장자입니다. - request info { image_name : %s }", imageName)
        );
    }
}
