package team.teamby.teambyteam.auth.exception;

import team.teamby.teambyteam.member.exception.MemberException;

public class AuthenticationException extends RuntimeException{

    public AuthenticationException(final String message) {
        super(message);
    }

    public static class UnSupportAuthenticationException extends MemberException {
        public UnSupportAuthenticationException() {
            super("지원하지 않는 인증 방식입니다.");
        }
    }
}
