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
        public EmailRegexException() {
            super("정해진 이메일의 양식이 아닙니다.");
        }
    }

    public static class MemberNotFoundException extends MemberException {
        public MemberNotFoundException() {
            super("조회한 멤버가 존재하지 않습니다.");
        }
    }

    public static class UnSupportAuthenticationException extends MemberException {
        public UnSupportAuthenticationException() {
            super("지원하지 않는 인증 방식입니다.");
        }
    }
}
