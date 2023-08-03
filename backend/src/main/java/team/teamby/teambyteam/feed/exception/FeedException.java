package team.teamby.teambyteam.feed.exception;

public class FeedException extends RuntimeException {

    public FeedException(String message) {
        super(message);
    }

    public static class ContentLengthException extends FeedException {
        public ContentLengthException() {
            super("피드 내용의 길이가 최대 길이를 초과했습니다.");
        }
    }

}
