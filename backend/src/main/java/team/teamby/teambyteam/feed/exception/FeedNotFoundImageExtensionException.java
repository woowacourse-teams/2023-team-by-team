package team.teamby.teambyteam.feed.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class FeedNotFoundImageExtensionException extends CustomBadRequestException {
    public FeedNotFoundImageExtensionException(final String imageName) {
        super(String.format("요청한 이미지의 확장자를 찾을 수 없습니다. - request info { image_name : %s }", imageName)
        );
    }
}
