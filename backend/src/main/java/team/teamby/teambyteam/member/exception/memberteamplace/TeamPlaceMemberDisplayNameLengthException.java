package team.teamby.teambyteam.member.exception.memberteamplace;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class TeamPlaceMemberDisplayNameLengthException extends CustomBadRequestException {
    public TeamPlaceMemberDisplayNameLengthException(final int allowedLength, final String inputValue) {
        super(String.format(
                "멤버 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d",
                allowedLength,
                inputValue.length())
        );
    }
}
