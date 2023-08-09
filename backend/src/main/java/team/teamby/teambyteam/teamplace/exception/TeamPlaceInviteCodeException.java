package team.teamby.teambyteam.teamplace.exception;

public final class TeamPlaceInviteCodeException extends RuntimeException {

    public TeamPlaceInviteCodeException(final String message) {
        super(message);
    }

    public static class NotFoundException extends TeamPlaceException {
        public NotFoundException() {
            super("존재하지 않는 초대코드 입니다.");
        }
    }

    public static class NotGeneratedInviteCodeException extends TeamPlaceException {
        public NotGeneratedInviteCodeException() {
            super("팀 플레이스의 초대코드가 생성되지 않았습니다.");
        }
    }

    public static class LengthException extends TeamPlaceException {
        public LengthException() {
            super("팀 플레이스의 초대코드의 길이가 맞지 않습니다.");
        }
    }
}
