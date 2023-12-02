package team.teamby.teambyteam.filesystem.exception;

public class FileControlException extends RuntimeException {
    public FileControlException(final Throwable cause) {
        super(cause);
    }

    public FileControlException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
