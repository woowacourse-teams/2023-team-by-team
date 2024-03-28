package team.teamby.teambyteam.schedule.exception;

import team.teamby.teambyteam.common.exception.CustomNotFondException;

public class ScheduleNotFoundException extends CustomNotFondException {
    public ScheduleNotFoundException(final Long scheduleId) {
        super(String.format("조회한 일정이 존재하지 않습니다. - request info { schedule_id : %d }", scheduleId));
    }
}
