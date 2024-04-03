package team.teamby.teambyteam.feed.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class FeedWritingRequestEmptyException extends CustomBadRequestException {
    public FeedWritingRequestEmptyException() {
        super("내용과 이미지가 모두 존재하지 않습니다.");
    }
}
