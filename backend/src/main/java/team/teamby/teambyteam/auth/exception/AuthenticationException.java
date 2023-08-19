package team.teamby.teambyteam.auth.exception;

public class AuthenticationException extends RuntimeException {

    public AuthenticationException(final String message) {
        super(message);
    }

    public static class FailAuthenticationException extends AuthenticationException {
        public FailAuthenticationException() {
            super("인증이 실패했습니다.");
        }
    }
}
