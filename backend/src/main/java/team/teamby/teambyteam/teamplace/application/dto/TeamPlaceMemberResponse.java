package team.teamby.teambyteam.teamplace.application.dto;

import team.teamby.teambyteam.member.domain.MemberTeamPlace;

public record TeamPlaceMemberResponse(Long id, String name, String profileImageUrl) {

    public static TeamPlaceMemberResponse of(final MemberTeamPlace memberTeamPlace) {
        return new TeamPlaceMemberResponse(
                memberTeamPlace.findMemberId(),
                memberTeamPlace.findMemberName(),
                memberTeamPlace.findMemberProfileImageUrl()
        );
    }
}
