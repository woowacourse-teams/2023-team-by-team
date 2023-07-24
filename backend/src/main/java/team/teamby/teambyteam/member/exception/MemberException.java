package team.teamby.teambyteam.member.exception;

public class MemberException extends RuntimeException {

    public MemberException(final String message) {
        super(message);
    }

    public static class NameLengthException extends MemberException {

        public NameLengthException() {
            super("멤버 이름의 길이가 최대 이름 길이를 초과했습니다.");
        }
    }

    public static class NameBlankException extends MemberException {

        public NameBlankException() {
            super("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

    public static class EmailRegexException extends MemberException {
        public EmailRegexException(final String message) {
            super(message);
        }
    }

    public static class MemberNotFoundException extends MemberException {
        public MemberNotFoundException(final String message) {
            super(message);
        }
    }

    public static class UnSupportAuthenticationException extends MemberException {
        public UnSupportAuthenticationException(final String message) {
            super(message);
        }
    }
}
