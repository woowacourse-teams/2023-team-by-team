package team.teamby.teambyteam.global.presentation;

import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;
import team.teamby.teambyteam.token.exception.TokenException;

import java.time.DateTimeException;
import java.time.format.DateTimeParseException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    final Logger log = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(final MethodArgumentNotValidException exception) {
        final String defaultErrorMessage = exception.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        log.warn(defaultErrorMessage, exception);

        return ResponseEntity.badRequest().body(defaultErrorMessage);
    }

    @ExceptionHandler(value = {
            DateTimeParseException.class,
            DateTimeException.class
    })
    public ResponseEntity<String> handleDateTimeParseException(final DateTimeException exception) {
        log.warn(exception.getMessage(), exception);

        return ResponseEntity.badRequest().body("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요.");
    }

    @ExceptionHandler(value = {
            MemberException.MemberNotFoundException.class,
            TeamPlaceException.NotFoundException.class,
            ScheduleException.ScheduleNotFoundException.class,
            TokenException.TokenNotFoundException.class
    })
    public ResponseEntity<String> handleNotFoundException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message, exception);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(value = {
            AuthenticationException.FailAuthenticationException.class,
            ExpiredJwtException.class
    })
    public ResponseEntity<String> handleAuthenticationException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message, exception);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(message);
    }

    @ExceptionHandler(value = {
            ScheduleException.TeamAccessForbidden.class,
            TeamPlaceException.TeamPlaceAccessForbidden.class
    })
    public ResponseEntity<String> handleCustomForbiddenException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message, exception);

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(message);
    }

    @ExceptionHandler(value = {ScheduleException.SpanWrongOrderException.class})
    public ResponseEntity<String> handleCustomBadRequestException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message, exception);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(message);
    }
}
