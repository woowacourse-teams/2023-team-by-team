package team.teamby.teambyteam.schedule.exception;

public class ScheduleException extends RuntimeException {

    public ScheduleException(final String message) {
        super(message);
    }

    public static class ScheduleNotFoundException extends ScheduleException {
        public ScheduleNotFoundException() {
            super("조회한 일정이 존재하지 않습니다.");
        }
    }

    public static class TeamAccessForbidden extends ScheduleException {
        public TeamAccessForbidden() {
            super("해당 팀플레이스에 일정을 조회할 권한이 없습니다.");
        }
    }

    public static class SpanWrongOrderException extends ScheduleException {
        public SpanWrongOrderException() {
            super("시작 일자가 종료 일자보다 이후일 수 없습니다.");
        }
    }

    public static class TitleBlankException extends ScheduleException {

        public TitleBlankException() {
            super("일정의 제목은 빈 칸일 수 없습니다.");
        }
    }
}
