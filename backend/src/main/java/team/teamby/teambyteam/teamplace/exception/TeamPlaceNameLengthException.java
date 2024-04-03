package team.teamby.teambyteam.teamplace.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class TeamPlaceNameLengthException extends CustomBadRequestException {
    public TeamPlaceNameLengthException(final int allowedLength, final String inputValue) {
        super(String.format(
                "팀 플레이스 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d }",
                allowedLength,
                inputValue.length())
        );
    }
}
