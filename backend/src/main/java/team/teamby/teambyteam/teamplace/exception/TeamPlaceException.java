package team.teamby.teambyteam.teamplace.exception;

public class TeamPlaceException extends RuntimeException {

    public TeamPlaceException(final String message) {
        super(message);
    }

    public static class NameLengthException extends TeamPlaceException {
        public NameLengthException(final String message) {
            super(message);
        }
    }
}
