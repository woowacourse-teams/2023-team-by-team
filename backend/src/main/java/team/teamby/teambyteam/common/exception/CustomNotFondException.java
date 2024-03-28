package team.teamby.teambyteam.common.exception;

public abstract class CustomNotFondException extends RuntimeException {

    public CustomNotFondException(String message) {
        super(message);
    }

    public CustomNotFondException(String message, Throwable cause) {
        super(message, cause);
    }
}
