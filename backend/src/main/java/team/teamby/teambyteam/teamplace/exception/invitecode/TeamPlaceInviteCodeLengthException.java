package team.teamby.teambyteam.teamplace.exception.invitecode;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class TeamPlaceInviteCodeLengthException extends CustomBadRequestException {
    public TeamPlaceInviteCodeLengthException(final int allowedLength, final String inviteCodeInput) {
        super(String.format(
                "팀 플레이스의 초대코드의 길이가 맞지 않습니다. - request info { allowed_length : %d, input_value_length : %d }",
                allowedLength,
                inviteCodeInput.length())
        );
    }
}
