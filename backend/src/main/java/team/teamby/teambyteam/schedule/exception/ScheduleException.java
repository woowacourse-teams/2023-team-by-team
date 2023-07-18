package team.teamby.teambyteam.schedule.exception;

public class ScheduleException extends RuntimeException {

    public ScheduleException(final String message) {
        super(message);
    }

    public static class ScheduleNotFoundException extends ScheduleException {
        public ScheduleNotFoundException(final String message) {
            super(message);
        }
    }

    public static class TeamAccessForbidden extends ScheduleException {
        public TeamAccessForbidden(final String message) {
            super(message);
        }
    }

    public static class SpanWrongOrderException extends ScheduleException {
        public SpanWrongOrderException(final String message) {
            super(message);
        }
    }

    public static class TitleBlankException extends ScheduleException {

        public TitleBlankException(final String message) {
            super(message);
        }
    }
}
