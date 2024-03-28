package team.teamby.teambyteam.teamplace.exception;

public final class TeamPlaceInviteCodeException extends RuntimeException {

    public TeamPlaceInviteCodeException(final String message) {
        super(message);
    }

    public static class NotGeneratedInviteCodeException extends TeamPlaceException {
        public NotGeneratedInviteCodeException(final Long teamPlaceId) {
            super(String.format("팀 플레이스의 초대코드가 생성되지 않았습니다. - request info { team_place_id : %d }", teamPlaceId));
        }
    }

    public static class LengthException extends TeamPlaceException {
        public LengthException(final int allowedLength, final String inviteCodeInput) {
            super(String.format(
                    "팀 플레이스의 초대코드의 길이가 맞지 않습니다. - request info { allowed_length : %d, input_value_length : %d }",
                    allowedLength,
                    inviteCodeInput.length())
            );
        }
    }
}
