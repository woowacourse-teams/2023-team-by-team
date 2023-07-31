package team.teamby.teambyteam.member.domain;

import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;

public record MemberIdAndDisplayNameOnly(
        Long id,
        DisplayMemberName displayMemberName
) {
}
