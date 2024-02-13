package team.teamby.teambyteam.sse.domain.converter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.notice.domain.event.NoticeCreationEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;

@Component
@RequiredArgsConstructor
public class NoticeCreatedEventConverter implements TeamPlaceSseConverter<Long> {

    private final NoticeRepository noticeRepository;

    @Override
    public TeamPlaceSseEvent convert(DomainEvent<Long> event) {
        final Long noticeId = event.getDomainId();
        final Long teamPlaceId = noticeRepository.findTeamPlaceIdByNoticeId(noticeId)
                .orElseThrow(() -> new RuntimeException(String.format("팀플레이스 공지를 찾을 수 없습니다. id : %d", noticeId)));
        return new NoticeCreatedSse(noticeId, teamPlaceId);
    }

    @Override
    public String supportEventName() {
        return NoticeCreationEvent.class.getName();
    }

    private static class NoticeCreatedSse implements TeamPlaceSseEvent {

        private static final String EVENT_NAME = "new_notice";

        private final NoticeSse event;

        public NoticeCreatedSse(final Long id, final Long teamPlaceId) {
            this.event = new NoticeSse(id, teamPlaceId);
        }

        @Override
        public Long getTeamPlaceId() {
            return event.teamPlaceId;
        }

        @Override
        public String getEventName() {
            return EVENT_NAME;
        }

        @Override
        public Object getEvent(TeamPlaceEmitterId emitterId) {
            return event;
        }

        private record NoticeSse(Long id, Long teamPlaceId) {
        }
    }
}
