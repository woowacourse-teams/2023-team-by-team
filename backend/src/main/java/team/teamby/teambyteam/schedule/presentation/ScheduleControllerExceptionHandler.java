package team.teamby.teambyteam.schedule.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

@ControllerAdvice("team.teamby.teambyteam.schedule.presentation")
public class ScheduleControllerExceptionHandler {

    @ExceptionHandler(value = {ScheduleException.ScheduleNotFoundException.class})
    public ResponseEntity<String> notFoundExceptionHandler(final ScheduleException exception) {
        final String message = exception.getMessage();

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(message);
    }

    @ExceptionHandler(value = {ScheduleException.TeamAccessForbidden.class})
    public ResponseEntity<String> forbiddenExceptionHandler(final ScheduleException exception) {
        final String message = exception.getMessage();

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(message);
    }
}
