package team.teamby.teambyteam.teamplace.exception;

public class TeamPlaceInviteCodeNotFoundException extends TeamPlaceException {
    public TeamPlaceInviteCodeNotFoundException(final String inviteCode) {
        super(String.format("존재하지 않는 초대코드 입니다. - request Info { invite_code : %s }", inviteCode));
    }
}
