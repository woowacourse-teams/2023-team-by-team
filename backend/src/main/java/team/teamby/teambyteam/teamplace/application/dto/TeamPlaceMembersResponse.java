package team.teamby.teambyteam.teamplace.application.dto;

import java.util.List;

public record TeamPlaceMembersResponse(List<TeamPlaceMemberResponse> members) {

    public static TeamPlaceMembersResponse from(final List<TeamPlaceMemberResponse> members) {
        return new TeamPlaceMembersResponse(members);
    }
}
