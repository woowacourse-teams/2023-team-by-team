package team.teamby.teambyteam.common.fixtures;

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
