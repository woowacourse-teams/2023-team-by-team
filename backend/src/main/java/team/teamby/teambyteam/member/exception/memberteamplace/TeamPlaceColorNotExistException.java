package team.teamby.teambyteam.member.exception.memberteamplace;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class TeamPlaceColorNotExistException extends CustomBadRequestException {

    public TeamPlaceColorNotExistException(final int colorNumber) {
        super(String.format(
                "존재하지 않는 팀 플레이스 색상입니다. - request info { team_place_color : %d }",
                colorNumber
        ));
    }
}
