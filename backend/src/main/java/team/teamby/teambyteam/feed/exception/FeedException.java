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

}
