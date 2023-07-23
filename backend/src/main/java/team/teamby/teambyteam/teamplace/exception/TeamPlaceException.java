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

    public static class NotFoundException extends TeamPlaceException {

        public NotFoundException(final String message) {
            super(message);
        }
    }

    public static class TeamPlaceAccessForbidden extends TeamPlaceException {
        public TeamPlaceAccessForbidden(final String message) {
            super(message);
        }
    }
}
