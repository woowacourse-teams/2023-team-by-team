package team.teamby.teambyteam.schedule.exception;

import team.teamby.teambyteam.common.exception.CustomForbiddenException;

public class TeamScheduleAccessException extends CustomForbiddenException {
    public TeamScheduleAccessException(final Long scheduleId, final Long teamPlaceId) {
        super(String.format("해당 팀플레이스에 일정을 조회할 권한이 없습니다. - request info { schedule_id : %d, team_place_id : %d }", scheduleId, teamPlaceId));
    }
}
