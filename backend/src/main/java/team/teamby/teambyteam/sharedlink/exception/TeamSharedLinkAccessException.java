package team.teamby.teambyteam.sharedlink.exception;

import team.teamby.teambyteam.common.exception.CustomForbiddenException;

public class TeamSharedLinkAccessException extends CustomForbiddenException {
    public TeamSharedLinkAccessException(final Long teamPlaceId, final Long sharedLinkId) {
        super(String.format(
                "팀플레이스에 소속되지 않은 공유링크입니다. - request info { team_place_id : %d, sharedLinkId : %d }",
                teamPlaceId,
                sharedLinkId)
        );
    }
}
