package team.teamby.teambyteam.schedule.exception;

import java.time.LocalDateTime;

public class ScheduleException extends RuntimeException {

    public ScheduleException(final String message) {
        super(message);
    }

    public ScheduleException(String message, Throwable cause) {
        super(message, cause);
    }

    public static class TeamAccessForbidden extends ScheduleException {
        public TeamAccessForbidden(final Long scheduleId, final Long teamPlaceId) {
            super(String.format("해당 팀플레이스에 일정을 조회할 권한이 없습니다. - request info { schedule_id : %d, team_place_id : %d }", scheduleId, teamPlaceId));
        }
    }

    public static class SpanWrongOrderException extends ScheduleException {
        public SpanWrongOrderException(final LocalDateTime startDateTime, final LocalDateTime endDateTime) {
            super(String.format(
                    "시작 일자가 종료 일자보다 이후일 수 없습니다. - request info { start_date_time : %s, end_date_time : %s }",
                    startDateTime.toString(),
                    endDateTime.toString())
            );
        }
    }

    public static class TitleBlankException extends ScheduleException {
        public TitleBlankException() {
            super("일정의 제목은 빈 칸일 수 없습니다.");
        }
    }

    public static class DescriptionLengthException extends ScheduleException {
        public DescriptionLengthException() {
            super("일정 메모가 너무 깁니다.");
        }
    }

    public static class dateFormatException extends ScheduleException {
        public dateFormatException(final Exception e) {
            super("잘못된 날짜 입력 형식입니다.", e);
        }
    }
}
