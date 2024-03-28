package team.teamby.teambyteam.common.exception;

public abstract class CustomForbiddenException extends RuntimeException {

    public CustomForbiddenException(String message) {
        super(message);
    }

    public CustomForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }
}
