package team.teamby.teambyteam.sharedlink.exception;

public class SharedLinkException extends RuntimeException {

    public SharedLinkException(final String message) {
        super(message);
    }

    public static class TitleException extends SharedLinkException {
        public TitleException() {
            super("공유 링크의 제목은 빈칸으로 구성될 수 없습니다.");
        }
    }

    public static class URLException extends SharedLinkException {
        public URLException() {
            super("공유 링크는 빈칸으로 구성될 수 없습니다.");
        }
    }
}
