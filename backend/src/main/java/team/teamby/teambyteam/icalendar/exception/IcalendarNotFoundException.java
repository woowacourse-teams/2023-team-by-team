package team.teamby.teambyteam.icalendar.exception;

import team.teamby.teambyteam.common.exception.CustomNotFoundException;

public class IcalendarNotFoundException extends CustomNotFoundException {

    public IcalendarNotFoundException(final Long teamPlaceId) {
        super(String.format("배포중인 캘린더를 찾을 수 없습니다. 팀플레이스 아이디 : %d", teamPlaceId));
    }
}
