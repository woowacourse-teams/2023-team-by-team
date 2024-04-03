package team.teamby.teambyteam.notice.exception;

import team.teamby.teambyteam.common.exception.CustomBadRequestException;

public class NoticeImageOverCountException extends CustomBadRequestException {
    public NoticeImageOverCountException(final int allowedMaxCount, final int inputImageCount) {
        super(String.format(
                "허용된 이미지의 개수를 초과했습니다. - request info { allowed_count : %d, input_image_count : %d }",
                allowedMaxCount,
                inputImageCount)
        );
    }
}
