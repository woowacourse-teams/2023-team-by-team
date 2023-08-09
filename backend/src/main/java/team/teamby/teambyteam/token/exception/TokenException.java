package team.teamby.teambyteam.token.exception;

public class TokenException extends RuntimeException {

    public TokenException(final String message) {
        super(message);
    }

    public static class TokenNotFoundException extends TokenException {
        public TokenNotFoundException() {
            super("토큰을 찾을 수 없습니다.");
        }
    }
}
