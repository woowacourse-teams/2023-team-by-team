package team.teamby.teambyteam.sharedlink.application.dto;

import java.util.List;

public record SharedLinksResponse(List<SharedLinkResponse> teamLinks) {

    public static SharedLinksResponse of(final List<SharedLinkResponse> teamLinks) {
        return new SharedLinksResponse(teamLinks);
    }
}
