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
import java.util.Random;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String DEFAULT_ERROR_MESSAGE = "관리자에게 문의하세요.";
    private static final String DEFAULT_FORMAT_ERROR_MESSAGE = "잘못된 형식입니다.";

    private static final Random random = new Random();
    private static final String ERROR_KEY_FORMAT = "%n error key : %s";
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final int ERROR_KEY_LENGTH = 5;

    private static final String EXCEPTION_CLASS_TYPE_MESSAGE_FORMANT = "%n class type : %s";

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
                .body(new ErrorResponse(DEFAULT_FORMAT_ERROR_MESSAGE));
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
            TeamPlaceException.NameBlankException.class,
            MemberException.NameLengthException.class,
            MemberException.NameBlankException.class
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

        final StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ERROR_KEY_LENGTH; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        final String errorKeyInfo = String.format(ERROR_KEY_FORMAT, sb.toString());
        final String exceptionTypeInfo = String.format(EXCEPTION_CLASS_TYPE_MESSAGE_FORMANT, exception.getClass());

        log.error(message + errorKeyInfo + exceptionTypeInfo);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(DEFAULT_ERROR_MESSAGE + errorKeyInfo));
    }
}
