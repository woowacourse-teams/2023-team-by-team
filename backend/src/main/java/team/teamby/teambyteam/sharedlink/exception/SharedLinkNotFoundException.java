package team.teamby.teambyteam.sharedlink.exception;

import team.teamby.teambyteam.common.exception.CustomNotFondException;

public class SharedLinkNotFoundException extends CustomNotFondException {
    public SharedLinkNotFoundException(final Long sharedLinkId) {
        super(String.format("존재하지 않는 공유 링크입니다. - request info { sharedLinkId : %d }", sharedLinkId));
    }
}
