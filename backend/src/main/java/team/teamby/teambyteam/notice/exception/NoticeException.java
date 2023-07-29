package team.teamby.teambyteam.notice.exception;

public class NoticeException extends RuntimeException {

    public NoticeException(String message) {
        super(message);
    }

    public static class ContentLengthException extends NoticeException {
        public ContentLengthException() {
            super("공지 내용의 길이가 최대 길이를 초과했습니다.");
        }
    }
}
