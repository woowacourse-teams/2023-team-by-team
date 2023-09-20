package team.teamby.teambyteam.feed.exception;

public class FeedException extends RuntimeException {

    public FeedException(String message) {
        super(message);
    }

    public static class ContentLengthException extends FeedException {
        public ContentLengthException(final int allowedMaxLength, final String inputContent) {
            super(String.format(
                    "피드 내용의 길이가 최대 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d }",
                    allowedMaxLength,
                    inputContent.length())
            );
        }
    }

    public static class ImageOverCountException extends FeedException {
        public ImageOverCountException(final int allowedMaxCount, final int inputImageCount) {
            super(String.format(
                    "허용된 이미지의 개수를 초과했습니다. - request info { allowed_count : %d, input_image_count : %d }",
                    allowedMaxCount,
                    inputImageCount)
            );
        }
    }

    public static class ImageSizeException extends FeedException {
        public ImageSizeException(final long allowedMaxSize, final long inputImageSize) {
            super(String.format(
                    "허용된 이미지의 크기를 초과했습니다. - request info { allowed_size : %d, input_image_size : %d }",
                    allowedMaxSize,
                    inputImageSize)
            );
        }
    }

    public static class NotFoundImageExtensionException extends FeedException {
        public NotFoundImageExtensionException(final String imageName) {
            super(String.format("요청한 이미지의 확장자를 찾을 수 없습니다. - request info { image_name : %s }", imageName)
            );
        }
    }

    public static class NotAllowedImageExtensionException extends FeedException {
        public NotAllowedImageExtensionException(final String imageName) {
            super(String.format("허용되지 않은 확장자입니다. - request info { image_name : %s }", imageName)
            );
        }
    }
}
