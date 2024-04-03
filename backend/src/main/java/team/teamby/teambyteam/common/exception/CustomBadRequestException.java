package team.teamby.teambyteam.common.exception;

public abstract class CustomBadRequestException extends RuntimeException {
    public CustomBadRequestException(String message) {
        super(message);
    }

    public CustomBadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
