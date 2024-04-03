package team.teamby.teambyteam.schedule.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class ScheduleDateFormatException extends CustomBadRequestException {
    public ScheduleDateFormatException(final Exception e) {
        super("잘못된 날짜 입력 형식입니다.", e);
    }
}
