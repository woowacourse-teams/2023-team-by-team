package team.teamby.teambyteam.teamplace.exception.invitecode;

public final class TeamPlaceInviteCodeException extends RuntimeException {

    public TeamPlaceInviteCodeException(final String message) {
        super(message);
    }

    public static class NotGeneratedInviteCodeException extends RuntimeException {
        public NotGeneratedInviteCodeException(final Long teamPlaceId) {
            super(String.format("팀 플레이스의 초대코드가 생성되지 않았습니다. - request info { team_place_id : %d }", teamPlaceId));
        }
    }

}
