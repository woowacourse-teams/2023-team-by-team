package team.teamby.teambyteam.teamplace.exception;

import team.teamby.teambyteam.common.exception.CustomNotFondException;

public class TeamPlaceNotFoundException extends CustomNotFondException {

    public TeamPlaceNotFoundException(final Long teamPlaceId) {
        super(String.format("조회한 팀 플레이스가 존재하지 않습니다. - request info { team_place_id : %d }", teamPlaceId));
    }
}
