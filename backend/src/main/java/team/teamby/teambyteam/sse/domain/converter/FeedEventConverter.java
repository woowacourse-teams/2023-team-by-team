package team.teamby.teambyteam.sse.domain.converter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.event.FeedEvent;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FeedEventConverter implements TeamPlaceSseConverter {

    private final FeedRepository feedRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Override
    @Transactional(readOnly = true)
    public TeamPlaceSseEvent convert(final DomainEvent event) {
        final Long feedId = (Long) event.getDomainId();
        final Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new RuntimeException("No FeedFound ID : " + feedId));
        final MemberTeamPlace author = memberTeamPlaceRepository
                .findByTeamPlaceIdAndMemberId(feed.getTeamPlaceId(), feed.getAuthorId())
                .orElse(MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE);
        return new FeedSse(feed, author);
    }

    @Override
    public String supportEventName() {
        return FeedEvent.class.getName();
    }

    private static class FeedSse implements TeamPlaceSseEvent {

        private static final String EVENT_NAME = "new_thread";

        private final Long teamPlaceId;
        private final FeedResponse forMe;
        private FeedResponse forOthers;

        public FeedSse(final Feed feed, final MemberTeamPlace author) {
            this.teamPlaceId = feed.getTeamPlaceId();
            final String createdAt = feed.getCreatedAt().format(FeedResponse.DATE_TIME_FORMATTER);
            this.forMe = new FeedResponse(
                    feed.getId(),
                    feed.getType().name().toLowerCase(),
                    feed.getAuthorId(),
                    author.getDisplayMemberNameValue(),
                    author.findMemberProfileImageUrl(),
                    createdAt,
                    feed.getContent().getValue(),
                    convertImageResponses(((FeedThread) feed).getImages()),
                    true
            );
        }

        private static List<FeedImageResponse> convertImageResponses(final List<FeedThreadImage> images) {
            return images.stream().map(feedThreadImage ->
                            new FeedImageResponse(
                                    feedThreadImage.getId(),
                                    feedThreadImage.isExpired(),
                                    feedThreadImage.getImageName().getValue(),
                                    feedThreadImage.getImageUrl().getValue()))
                    .toList();
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
            if (forOthers == null) {
                return new FeedResponse(
                        forMe.id(),
                        forMe.type(),
                        forMe.authorId(),
                        forMe.authorName(),
                        forMe.profileImageUrl(),
                        forMe.createdAt(),
                        forMe.content(),
                        forMe.images(),
                        false
                );
            }
            return forOthers;
        }
    }
}
