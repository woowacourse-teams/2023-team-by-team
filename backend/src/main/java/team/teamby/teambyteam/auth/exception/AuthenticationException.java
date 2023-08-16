package team.teamby.teambyteam.auth.exception;

import team.teamby.teambyteam.member.exception.MemberException;

public class AuthenticationException extends RuntimeException {

    public AuthenticationException(final String message) {
        super(message);
    }

    public static class FailAuthenticationException extends MemberException {
        public FailAuthenticationException() {
            super("인증이 실패했습니다.");
        }
    }
}
