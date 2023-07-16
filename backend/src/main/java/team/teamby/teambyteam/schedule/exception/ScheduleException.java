package team.teamby.teambyteam.schedule.exception;

public class ScheduleException extends RuntimeException {

    public ScheduleException(final String message) {
        super(message);
    }

    public static class SpanWrongOrderException extends ScheduleException {
        public SpanWrongOrderException(final String message) {
            super(message);
        }
    }

    public static class NotFoundException extends ScheduleException {
        public NotFoundException(final String message) {
            super(message);
        }
    }
}
