package team.teamby.teambyteam.schedule.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class ScheduleTitleBlankException extends CustomBadRequestException {
    public ScheduleTitleBlankException() {
        super("일정의 제목은 빈 칸일 수 없습니다.");
    }
}
