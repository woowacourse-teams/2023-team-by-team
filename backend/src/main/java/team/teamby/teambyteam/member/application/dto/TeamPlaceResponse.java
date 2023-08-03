package team.teamby.teambyteam.member.application.dto;

import team.teamby.teambyteam.member.domain.MemberTeamPlace;

public record TeamPlaceResponse(
        Long id,
        String displayName,
        Integer teamPlaceColor
) {
    public static TeamPlaceResponse of(MemberTeamPlace memberTeamPlace) {
        return new TeamPlaceResponse(
                memberTeamPlace.getId(),
                memberTeamPlace.getDisplayTeamPlaceName().getValue(),
                memberTeamPlace.getTeamPlaceColor().getColorNumber()
        );
    }
}
