package team.teamby.teambyteam.member.application.dto;

import team.teamby.teambyteam.member.domain.MemberTeamPlace;

import java.util.List;

public record TeamPlacesResponse(List<TeamPlaceResponse> teamPlaces) {
    public static TeamPlacesResponse of(List<MemberTeamPlace> allByMemberId) {
        return new TeamPlacesResponse(allByMemberId.stream()
                .map(TeamPlaceResponse::of)
                .toList());
    }
}
