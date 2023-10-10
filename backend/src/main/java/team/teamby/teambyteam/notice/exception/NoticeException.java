package team.teamby.teambyteam.notice.exception;

public class NoticeException extends RuntimeException {

    public NoticeException(String message) {
        super(message);
    }

    public static class ContentLengthException extends NoticeException {
        public ContentLengthException(final int allowedLength, final String inputValue) {
            super(String.format(
                    "공지 내용의 길이가 최대 길이를 초과했습니다. - request info { allowed length : %d, input_value_length : %d }",
                    allowedLength,
                    inputValue.length())
            );
        }
    }

    public static class ImageOverCountException extends NoticeException {
        public ImageOverCountException(final int allowedMaxCount, final int inputImageCount) {
            super(String.format(
                    "허용된 이미지의 개수를 초과했습니다. - request info { allowed_count : %d, input_image_count : %d }",
                    allowedMaxCount,
                    inputImageCount)
            );
        }
    }

    public static class ImageSizeException extends NoticeException {
        public ImageSizeException(final long allowedMaxSize, final long inputImageSize) {
            super(String.format(
                    "허용된 이미지의 크기를 초과했습니다. - request info { allowed_size : %d, input_image_size : %d }",
                    allowedMaxSize,
                    inputImageSize)
            );
        }
    }

    public static class NotFoundImageExtensionException extends NoticeException {
        public NotFoundImageExtensionException(final String imageName) {
            super(String.format("요청한 이미지의 확장자를 찾을 수 없습니다. - request info { image_name : %s }", imageName)
            );
        }
    }

    public static class NotAllowedImageExtensionException extends NoticeException {
        public NotAllowedImageExtensionException(final String imageName) {
            super(String.format("허용되지 않은 확장자입니다. - request info { image_name : %s }", imageName)
            );
        }
    }

    public static class WritingRequestEmptyException extends NoticeException {
        public WritingRequestEmptyException() {
            super("내용과 이미지가 모두 존재하지 않습니다.");
        }
    }
}
