package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;

public final class TeamPlaceInviteCodeFixtures {

    public static TeamPlaceInviteCode TEAM_PLACE_INVITE_CODE(final String inviteCode, final TeamPlace teamPlace) {
        return new TeamPlaceInviteCode(inviteCode, teamPlace);
    }
}
