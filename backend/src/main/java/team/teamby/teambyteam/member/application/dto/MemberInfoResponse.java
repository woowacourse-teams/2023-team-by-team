package team.teamby.teambyteam.member.application.dto;

import team.teamby.teambyteam.member.domain.Member;

public record MemberInfoResponse(
        Long id,
        String name,
        String profileImageUrl,
        String email
) {
    public static MemberInfoResponse of(final Member member) {
        return new MemberInfoResponse(
                member.getId(),
                member.getName().getValue(),
                member.getProfileImageUrl().getValue(),
                member.getEmail().getValue()
        );
    }
}
