package team.teamby.teambyteam.teamplace.exception.invitecode;

import team.teamby.teambyteam.common.exception.CustomNotFondException;

public class TeamPlaceInviteCodeNotFoundException extends CustomNotFondException {
    public TeamPlaceInviteCodeNotFoundException(final String inviteCode) {
        super(String.format("존재하지 않는 초대코드 입니다. - request Info { invite_code : %s }", inviteCode));
    }
}
