package team.teamby.teambyteam.notice.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class NoticeWritingRequestEmptyException extends CustomBadRequestException {
    public NoticeWritingRequestEmptyException() {
        super("내용과 이미지가 모두 존재하지 않습니다.");
    }
}
