package team.teamby.teambyteam.feed.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class FeedNotAllowedImageExtensionException extends CustomBadRequestException {
    public FeedNotAllowedImageExtensionException(final String imageName) {
        super(String.format("허용되지 않은 확장자입니다. - request info { image_name : %s }", imageName)
        );
    }
}
