package team.teamby.teambyteam.member.exception;

public class MemberException extends RuntimeException {

    public MemberException(final String message) {
        super(message);
    }

    public static class NameLengthException extends MemberException {
        public NameLengthException(final String message) {
            super(message);
        }
    }

    public static class EmailRegexException extends MemberException {
        public EmailRegexException(final String message) {
            super(message);
        }
    }
}
