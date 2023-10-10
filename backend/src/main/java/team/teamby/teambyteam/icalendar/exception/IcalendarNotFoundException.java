package team.teamby.teambyteam.icalendar.exception;

public class IcalendarNotFoundException extends RuntimeException{

    public IcalendarNotFoundException(final Long teamPlaceId) {
        super(String.format("배포중인 캘린더를 찾을 수 없습니다. 팀플레이스 아이디 : %d", teamPlaceId));
    }
}
