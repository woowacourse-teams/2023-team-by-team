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

    public static class NotFoundTeamPlaceException extends NoticeException {
        public NotFoundTeamPlaceException() {
            super("조회한 팀플레이스가 존재하지 않습니다.");
        }
    }


    public static class NotFoundMemberException extends NoticeException {
        public NotFoundMemberException() {
            super("조회한 멤버가 존재하지 않습니다.");
        }
    }
}
