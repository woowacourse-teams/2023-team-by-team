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
}
