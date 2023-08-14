package team.teamby.teambyteam.sharedlink.application.dto;

import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;

import java.time.format.DateTimeFormatter;

public record SharedLinkResponse(
        Long id,
        String title,
        String url,
        Long memberId,
        String memberName,
        String updatedAt
) {

    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public static SharedLinkResponse of(final SharedLink sharedLink, final MemberTeamPlace memberTeamPlace) {
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        final String updatedAt = sharedLink.getUpdatedAt().format(dateTimeFormatter);

        return new SharedLinkResponse(
                sharedLink.getId(),
                sharedLink.getTitle().getValue(),
                sharedLink.getSharedURL().getValue(),
                sharedLink.getMemberId(),
                memberTeamPlace.getDisplayMemberName().getValue(),
                updatedAt
        );
    }
}
