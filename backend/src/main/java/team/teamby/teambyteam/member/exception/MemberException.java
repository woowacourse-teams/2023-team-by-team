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

    public static class MemberNotFoundException extends MemberException {
        public MemberNotFoundException(final String message) {
            super(message);
        }
    }

    public static class IllegalTokenException extends MemberException {
        public IllegalTokenException(final String message) {
            super(message);
        }
    }
}
