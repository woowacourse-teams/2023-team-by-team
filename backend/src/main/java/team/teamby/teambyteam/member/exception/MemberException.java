package team.teamby.teambyteam.member.exception;

public class MemberException extends RuntimeException {

    public MemberException(final String message) {
        super(message);
    }

    public static class EmailRegexException extends MemberException {
        public EmailRegexException(final String inputEmail) {
            super(String.format("정해진 이메일의 양식이 아닙니다. - request info { email : %s }", inputEmail));
        }
    }

}
