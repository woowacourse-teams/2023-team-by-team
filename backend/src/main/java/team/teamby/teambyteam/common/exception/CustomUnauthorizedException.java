package team.teamby.teambyteam.common.exception;

public abstract class CustomUnauthorizedException extends RuntimeException {

    public CustomUnauthorizedException(String message) {
        super(message);
    }

    public CustomUnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
