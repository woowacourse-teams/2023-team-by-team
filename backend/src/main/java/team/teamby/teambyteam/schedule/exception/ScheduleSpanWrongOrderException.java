package team.teamby.teambyteam.schedule.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

import java.time.LocalDateTime;

public class ScheduleSpanWrongOrderException extends CustomBadRequestException {
    public ScheduleSpanWrongOrderException(final LocalDateTime startDateTime, final LocalDateTime endDateTime) {
        super(String.format(
                "시작 일자가 종료 일자보다 이후일 수 없습니다. - request info { start_date_time : %s, end_date_time : %s }",
                startDateTime.toString(),
                endDateTime.toString())
        );
    }
}
