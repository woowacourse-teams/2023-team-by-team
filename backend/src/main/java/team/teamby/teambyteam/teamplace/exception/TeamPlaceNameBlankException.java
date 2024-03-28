package team.teamby.teambyteam.teamplace.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class TeamPlaceNameBlankException extends CustomBadRequestException {

    public TeamPlaceNameBlankException() {
        super("팀 플레이스 이름은 공백을 제외한 1자 이상이어야합니다.");
    }
}
