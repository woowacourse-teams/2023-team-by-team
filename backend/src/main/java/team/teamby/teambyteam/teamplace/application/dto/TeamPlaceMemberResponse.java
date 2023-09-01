package team.teamby.teambyteam.teamplace.application.dto;

import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;

public record TeamPlaceMemberResponse(Long id, String name, String profileImageUrl, Boolean isMe) {

    public static TeamPlaceMemberResponse of(final MemberTeamPlace memberTeamPlace, final Member loginMember) {
        return new TeamPlaceMemberResponse(
                memberTeamPlace.findMemberId(),
                memberTeamPlace.findMemberName(),
                memberTeamPlace.findMemberProfileImageUrl(),
                memberTeamPlace.getMember().equals(loginMember)
        );
    }
}
