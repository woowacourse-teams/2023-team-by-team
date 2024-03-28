package team.teamby.teambyteam.schedule.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class ScheduleDescriptionLengthException extends CustomBadRequestException {
    public ScheduleDescriptionLengthException() {
        super("일정 메모가 너무 깁니다.");
    }
}
