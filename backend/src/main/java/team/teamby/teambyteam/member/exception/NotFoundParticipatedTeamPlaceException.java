package team.teamby.teambyteam.member.exception;

import team.teamby.teambyteam.common.exception.CustomForbiddenException;

public class NotFoundParticipatedTeamPlaceException extends CustomForbiddenException {
    public NotFoundParticipatedTeamPlaceException(final String memberEmail, final Long teamPlaceId) {
        super(String.format(
                "해당 팀 플레이스에 가입되어 있지 않습니다. - request info { member_email : %s, team_place_id : %d }",
                memberEmail,
                teamPlaceId)
        );
    }
}
