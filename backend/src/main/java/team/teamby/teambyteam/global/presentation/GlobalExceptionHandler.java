package team.teamby.teambyteam.global.presentation;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.member.exception.MemberTeamPlaceException;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeException;
import team.teamby.teambyteam.token.exception.TokenException;

import java.time.DateTimeException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String DEFAULT_ERROR_MESSAGE = "관리자에게 문의하세요.";

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(final MethodArgumentNotValidException exception) {
        final String defaultErrorMessage = exception.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        log.warn(defaultErrorMessage);

        return ResponseEntity.badRequest()
                .body(new ErrorResponse(defaultErrorMessage));
    }

    @ExceptionHandler(value = {
            HttpMessageNotReadableException.class,
            DateTimeException.class
    })
    public ResponseEntity<ErrorResponse> handleDateTimeParseException(final DateTimeException exception) {
        log.warn(exception.getMessage());

        return ResponseEntity.badRequest()
                .body(new ErrorResponse("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요."));
    }

    @ExceptionHandler(value = {
            MethodArgumentTypeMismatchException.class
    })
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatch(final MethodArgumentTypeMismatchException exception) {
        log.warn(exception.getMessage());

        return ResponseEntity.badRequest()
                .body(new ErrorResponse(DEFAULT_ERROR_MESSAGE));
    }

    @ExceptionHandler(value = {
            MemberException.MemberNotFoundException.class,
            TeamPlaceException.NotFoundException.class,
            ScheduleException.ScheduleNotFoundException.class,
            TeamPlaceInviteCodeException.NotFoundException.class,
            SharedLinkException.NotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleNotFoundException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message);

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(message));
    }

    @ExceptionHandler(value = {
            AuthenticationException.FailAuthenticationException.class,
            ExpiredJwtException.class,
            TokenException.TokenNotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleAuthenticationException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(message));
    }

    @ExceptionHandler(value = {
            ScheduleException.TeamAccessForbidden.class,
            TeamPlaceException.TeamPlaceAccessForbidden.class,
            MemberTeamPlaceException.NotFoundParticipatedTeamPlaceException.class,
            SharedLinkException.OwnerForbiddenException.class
    })
    public ResponseEntity<ErrorResponse> handleCustomForbiddenException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message);

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse(message));
    }

    @ExceptionHandler(value = {
            ScheduleException.SpanWrongOrderException.class,
            TeamPlaceInviteCodeException.LengthException.class,
            TeamPlaceException.NameLengthException.class,
            TeamPlaceException.NameBlankException.class
    })
    public ResponseEntity<ErrorResponse> handleCustomBadRequestException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(message));
    }

    @ExceptionHandler(value = {
            RuntimeException.class
    })
    public ResponseEntity<ErrorResponse> handleRuntimeException(final RuntimeException exception) {
        final String message = exception.getMessage();
        log.warn(message);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(DEFAULT_ERROR_MESSAGE));
    }
}
