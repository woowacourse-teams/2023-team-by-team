package team.teamby.teambyteam.member.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class MemberNameLengthException extends CustomBadRequestException {

    public MemberNameLengthException(final int allowedLength, final String inputName) {
        super(String.format(
                "멤버 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_value_length : %d }",
                allowedLength,
                inputName.length())
        );
    }
}
