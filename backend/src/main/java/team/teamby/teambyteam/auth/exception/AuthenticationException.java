package team.teamby.teambyteam.auth.exception;

public class AuthenticationException extends RuntimeException {

    public AuthenticationException(final String message) {
        super(message);
    }

    public static class FailAuthenticationException extends AuthenticationException {
        public FailAuthenticationException(final String logMessage) {
            super(logMessage);
        }
    }
}
