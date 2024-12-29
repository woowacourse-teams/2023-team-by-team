package team.teamby.teambyteam.filesystem.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class ImageSizeException extends CustomBadRequestException {
    public ImageSizeException(final long allowedMaxSize, final long inputImageSize) {
        super(String.format(
                "허용된 이미지의 크기를 초과했습니다. - request info { allowed_size : %d, input_image_size : %d }",
                allowedMaxSize,
                inputImageSize)
        );
    }
}
