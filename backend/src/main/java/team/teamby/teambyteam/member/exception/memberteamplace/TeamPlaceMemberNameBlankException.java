package team.teamby.teambyteam.member.exception.memberteamplace;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class TeamPlaceMemberNameBlankException extends CustomBadRequestException {
    public TeamPlaceMemberNameBlankException() {
        super("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
    }
}
