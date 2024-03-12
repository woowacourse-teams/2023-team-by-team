package team.teamby.teambyteam.sse.domain.converter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.event.FeedEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;

@Slf4j
@Component
@RequiredArgsConstructor
public class FeedEventConverter implements TeamPlaceSseConverter<Long> {

    @Override
    @Transactional(readOnly = true)
    public TeamPlaceSseEvent convert(final DomainEvent<Long> event) {
        final FeedEvent feedEvent = (FeedEvent) event;
        final Long teamplaceId = feedEvent.getTeamPlaceId();

        return new FeedSse(feedEvent.response(), teamplaceId);
    }

    @Override
    public String supportEventName() {
        return FeedEvent.class.getName();
    }

    private static class FeedSse implements TeamPlaceSseEvent {

        private static final String EVENT_NAME = "new_thread";

        private final Long teamPlaceId;
        private FeedResponse forMe;
        private FeedResponse forOthers;

        public FeedSse(final FeedResponse response, final Long teamPlaceId) {
            this.teamPlaceId = teamPlaceId;
            if (response.isMe()) {
                forMe = response;
                forOthers = reverseForMeField(response);
                return;
            }
            forMe = reverseForMeField(response);
            forOthers = response;
        }

        private static FeedResponse reverseForMeField(final FeedResponse response) {
            return new FeedResponse(
                    response.id(),
                    response.type(),
                    response.authorId(),
                    response.authorName(),
                    response.profileImageUrl(),
                    response.createdAt(),
                    response.content(),
                    response.images(),
                    !response.isMe()
            );
        }

        @Override
        public Long getTeamPlaceId() {
            return teamPlaceId;
        }

        @Override
        public String getEventName() {
            return EVENT_NAME;
        }

        @Override
        public Object getEvent(final TeamPlaceEmitterId emitterId) {
            if (emitterId.isMemberId(forMe.authorId())) {
                return forMe;
            }
            return forOthers;
        }
    }
}
