package team.teamby.teambyteam.common.fixtures;

import static team.teamby.teambyteam.common.fixtures.FileFIxtures.OVER_SIZE_PNG_MOCK_MULTIPART_FILE;
import static team.teamby.teambyteam.common.fixtures.FileFIxtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1;
import static team.teamby.teambyteam.common.fixtures.FileFIxtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2;
import static team.teamby.teambyteam.common.fixtures.FileFIxtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3;
import static team.teamby.teambyteam.common.fixtures.FileFIxtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4;
import static team.teamby.teambyteam.common.fixtures.FileFIxtures.UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE;

import java.util.List;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.vo.Content;

public class NoticeFixtures {

    /**
     * CONTENT
     */
    public static final String FIRST_CONTENT = "1stNotice";
    public static final String SECOND_CONTENT = "2ndNotice";
    public static final String THIRD_CONTENT = "3rdNotice";

    /**
     * REQUEST
     */
    public static final NoticeRegisterRequest CONTENT_ONLY_REQUEST = new NoticeRegisterRequest(FIRST_CONTENT, null);
    public static final NoticeRegisterRequest IMAGE_ONLY_REQUEST = new NoticeRegisterRequest("",
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));
    public static final NoticeRegisterRequest CONTENT_AND_IMAGE_REQUEST = new NoticeRegisterRequest(FIRST_CONTENT,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));

    public static final NoticeRegisterRequest OVER_IMAGE_COUNT_REQUEST = new NoticeRegisterRequest(FIRST_CONTENT,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4,
                    UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1));

    public static final NoticeRegisterRequest OVER_IMAGE_SIZE_REQUEST = new NoticeRegisterRequest(FIRST_CONTENT, List.of(OVER_SIZE_PNG_MOCK_MULTIPART_FILE));
    public static final NoticeRegisterRequest NOT_ALLOWED_IMAGE_EXTENSION_REQUEST = new NoticeRegisterRequest(FIRST_CONTENT, List.of(UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE));

    public static final NoticeRegisterRequest EMPTY_REQUEST = new NoticeRegisterRequest("", null);

    /**
     * ENTITY
     */
    public static Notice NOTICE_1ST(final Long teamPlaceId, final Long authorId) {
        return new Notice(new Content(FIRST_CONTENT), teamPlaceId, authorId);
    }

    public static Notice NOTICE_2ND(final Long teamPlaceId, final Long authorId) {
        return new Notice(new Content(SECOND_CONTENT), teamPlaceId, authorId);
    }

    public static Notice NOTICE_3RD(final Long teamPlaceId, final Long authorId) {
        return new Notice(new Content(THIRD_CONTENT), teamPlaceId, authorId);
    }
}
