package team.teamby.teambyteam.member.exception.memberteamplace;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class MemberTeamPlaceException extends RuntimeException {

    public MemberTeamPlaceException(final String message) {
        super(message);
    }

    public static class TeamPlaceDisplayNameLengthException extends MemberTeamPlaceException {
        public TeamPlaceDisplayNameLengthException(final int allowedLength, final String inputValue) {
            super(String.format(
                    "팀플레이스의 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d",
                    allowedLength,
                    inputValue.length()));
        }
    }

    public static class TeamPlaceNameBlankException extends MemberTeamPlaceException {
        public TeamPlaceNameBlankException() {
            super("팀플레이스의 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

}
