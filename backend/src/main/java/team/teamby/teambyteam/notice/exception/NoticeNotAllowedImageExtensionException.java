package team.teamby.teambyteam.notice.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class NoticeNotAllowedImageExtensionException extends CustomBadRequestException {
    public NoticeNotAllowedImageExtensionException(final String imageName) {
        super(String.format("허용되지 않은 확장자입니다. - request info { image_name : %s }", imageName)
        );
    }
}
