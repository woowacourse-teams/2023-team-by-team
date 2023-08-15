package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;

public class SharedLinkFixtures {

    public static SharedLink TEAM_BY_TEAM_LINK(final Long teamPlaceId, final Long memberId) {
        return new SharedLink(teamPlaceId, memberId, new Title("팀바팀 링크"), new SharedURL("https://dev.teamby.team"));
    }
}
