package team.teamby.teambyteam.teamplace.application.dto;

import team.teamby.teambyteam.member.domain.MemberTeamPlace;

import java.util.List;

public record TeamPlaceMembersResponse(List<TeamPlaceMemberResponse> members) {

    public static TeamPlaceMembersResponse from(final List<MemberTeamPlace> memberTeamPlaces) {
        return new TeamPlaceMembersResponse(memberTeamPlaces.stream()
                .map(TeamPlaceMemberResponse::of)
                .toList()
        );
    }
}
