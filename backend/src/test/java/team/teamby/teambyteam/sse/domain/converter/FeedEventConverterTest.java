package team.teamby.teambyteam.sse.domain.converter;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import team.teamby.teambyteam.common.builder.TestFixtureBuilder;
import team.teamby.teambyteam.common.fixtures.FeedThreadFixtures;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.event.FeedEvent;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Sql({"/h2-truncate.sql"})
class FeedEventConverterTest {

    @Autowired
    private FeedEventConverter feedEventConverter;

    @Autowired
    protected TestFixtureBuilder testFixtureBuilder;

    @Test
    @DisplayName("FeedEvent 도메인 이벤트 지원 확인 테스트")
    void isSupportDomainFeedEvent() {
        // given
        final String expected = FeedEvent.class.getName();

        // when
        final String s = feedEventConverter.supportEventName();

        // then
        assertThat(s).isEqualTo(expected);
    }

    @Test
    @DisplayName("피드 도메인 이벤트 변환 테스트")
    void convert() {
        // given
        final Member savedMember = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final TeamPlace savedTeamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.CONTROLS_TEAM_PLACE());
        final MemberTeamPlace savedMemberTeamplcae = testFixtureBuilder.buildMemberTeamPlace(savedMember, savedTeamPlace);

        final Feed savedFeed = testFixtureBuilder.buildFeed(FeedThreadFixtures.CONTENT_ONLY_AND_IMAGE_EMPTY(savedTeamPlace.getId(), savedMember.getId()));

        final FeedResponse response = FeedResponse.from(
                savedFeed,
                savedMemberTeamplcae,
                null,
                savedMember.getEmailValue()
        );

        final FeedEvent testEvent = new FeedEvent(response);

        // when
        final TeamPlaceSseEvent sseEvent = feedEventConverter.convert(testEvent);
        final FeedResponse actualForMe = (FeedResponse) sseEvent.getEvent(TeamPlaceEmitterId.of(savedTeamPlace.getId(), savedMember.getId()));
        final FeedResponse actualForOthers = (FeedResponse) sseEvent.getEvent(TeamPlaceEmitterId.of(savedTeamPlace.getId(), savedMember.getId() + 1));

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(actualForMe.id()).isEqualTo(savedFeed.getId());
            softly.assertThat(actualForMe.authorId()).isEqualTo(savedMember.getId());
            softly.assertThat(actualForMe.content()).isEqualTo(savedFeed.getContent().getValue());
            softly.assertThat(actualForMe.isMe()).isTrue();
            softly.assertThat(actualForOthers.id()).isEqualTo(savedFeed.getId());
            softly.assertThat(actualForOthers.authorId()).isEqualTo(savedMember.getId());
            softly.assertThat(actualForOthers.content()).isEqualTo(savedFeed.getContent().getValue());
            softly.assertThat(actualForOthers.isMe()).isFalse();
        });

    }
}
