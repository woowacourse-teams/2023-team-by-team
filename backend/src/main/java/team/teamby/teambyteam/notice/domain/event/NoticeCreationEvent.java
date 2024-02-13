package team.teamby.teambyteam.notice.domain.event;

import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.notice.domain.Notice;

public class NoticeCreationEvent implements DomainEvent<Long> {

    public static final String NOTICE_NOT_CREATED_MESSAGE_FORMAT = "아직 생성되지 않은 공지입니다. teamplaceId: %d";
    private final Long id;

    public NoticeCreationEvent(final Notice notice) {
        validate(notice);
        this.id = notice.getId();
    }

    private static void validate(Notice notice) {
        if(notice.getId() == null) {
            throw new RuntimeException(String.format(NOTICE_NOT_CREATED_MESSAGE_FORMAT, notice.getTeamPlaceId()));
        }
    }

    @Override
    public Long getDomainId() {
        return id;
    }
}
