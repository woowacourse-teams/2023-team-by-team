package team.teamby.teambyteam.teamplace.exception;

import team.teamby.teambyteam.common.exception.CustomForbiddenException;

public class TeamPlaceAccessForbiddenException extends CustomForbiddenException {
    public TeamPlaceAccessForbiddenException(final Long teamPlaceId, final String memberEmail) {
        super(String.format("접근할 수 없는 팀플레이스입니다. - request info { team_place_id : %d, member_email : %s }", teamPlaceId, memberEmail));
    }
}
