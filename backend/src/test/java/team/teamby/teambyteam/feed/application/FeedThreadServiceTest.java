package team.teamby.teambyteam.feed.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.HELLO_WRITING_REQUEST;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;

class FeedThreadServiceTest extends ServiceTest {

    @Autowired
    private FeedThreadService feedThreadService;

    @Nested
    @DisplayName("피드에 스레드 작성시")
    class WriteThread {

        @Test
        @DisplayName("피드에 스레드를 작성한다.")
        void writeThreadSuccess() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = HELLO_WRITING_REQUEST;

            // when
            final Long feedId = feedThreadService.write(request, new MemberEmailDto(author.getEmail().getValue()), teamPlace.getId());

            //then
            assertThat(feedId).isNotNull();
        }

        @Test
        @DisplayName("존재하지 않는 멤버로 요청을 보내게 되면 예외가 발생한다.")
        void failUnAuthorized() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = HELLO_WRITING_REQUEST;

            // when & then
            assertThatThrownBy(() -> feedThreadService.write(request, new MemberEmailDto(author.getEmail().getValue() + "x"), teamPlace.getId()))
                    .isInstanceOf(MemberException.MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("피드의 스레드 조회시")
    class ReadThread {

        @Test
        @DisplayName("피드의 스레드를 비어있는 경우 처음 조회한다.")
        void firstNoneThreadReadSuccess() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final int size = 10;

            // when
            FeedsResponse feedsResponse = feedThreadService.firstRead(teamPlace.getId(), size);

            //then
            assertThat(feedsResponse.threads()).isEmpty();
        }

        @Test
        @DisplayName("피드의 스레드를 사이즈 이하인 경우 처음 조회한다.")
        void firstThreadReadUnderSizeSuccess() {
            // given
            Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            List<Feed> feeds = new ArrayList<>();
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello1"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello2"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello3"), member.getId()));
            testFixtureBuilder.buildFeeds(feeds);
            final int size = 10;

            // when
            FeedsResponse feedsResponse = feedThreadService.firstRead(teamPlace.getId(), size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(feedsResponse.threads().get(0).id()).isEqualTo(3);
                softly.assertThat(feedsResponse.threads().get(1).id()).isEqualTo(2);
                softly.assertThat(feedsResponse.threads().get(2).id()).isEqualTo(1);
            });
        }

        @Test
        @DisplayName("피드의 스레드를 사이즈 초과인 경우 처음 조회한다.")
        void firstThreadReadOverSizeSuccess() {
            // given
            Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            List<Feed> feeds = new ArrayList<>();
            final int size = 3;
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            testFixtureBuilder.buildFeeds(feeds);

            // when
            FeedsResponse feedsResponse = feedThreadService.firstRead(teamPlace.getId(), size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(feedsResponse.threads().get(0).id()).isEqualTo(5);
                softly.assertThat(feedsResponse.threads().get(1).id()).isEqualTo(4);
                softly.assertThat(feedsResponse.threads().get(2).id()).isEqualTo(3);
            });
        }

        @Test
        @DisplayName("피드의 스레드를 사이즈 초과인 경우 다음 페이지를 재조회한다.")
        void ThreadReReadOverSizeSuccess() {
            // given
            Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            List<Feed> feeds = new ArrayList<>();
            final int size = 3;
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), member.getId()));
            testFixtureBuilder.buildFeeds(feeds);

            // when
            FeedsResponse feedsResponse = feedThreadService.reRead(teamPlace.getId(), 4L, size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(feedsResponse.threads().get(0).id()).isEqualTo(3);
                softly.assertThat(feedsResponse.threads().get(1).id()).isEqualTo(2);
                softly.assertThat(feedsResponse.threads().get(2).id()).isEqualTo(1);
            });
        }

        @Test
        @DisplayName("피드의 스레드를 조회할 때 다른 팀플레이스의 피드는 조회되지 않는다.")
        void ThreadReadNotIncludeAnotherTeamPlaceSuccess() {
            // given
            Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace englishTeamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace japaneseTeamPlace = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final int size = 2;

            List<Feed> feeds = new ArrayList<>();
            feeds.add(new FeedThread(englishTeamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(japaneseTeamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(englishTeamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(japaneseTeamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(englishTeamPlace.getId(), new Content("Hello"), member.getId()));
            feeds.add(new FeedThread(japaneseTeamPlace.getId(), new Content("Hello"), member.getId()));
            testFixtureBuilder.buildFeeds(feeds);

            // when
            FeedsResponse feedsResponse = feedThreadService.reRead(englishTeamPlace.getId(), 5L, size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(feedsResponse.threads().get(0).id()).isEqualTo(3);
                softly.assertThat(feedsResponse.threads().get(1).id()).isEqualTo(1);
            });
        }

        @Test
        @DisplayName("존재하지 않는 멤버로 조회하면 예외가 발생한다.(피드 스레드의 경우)")
        void failFeedThreadMemberNotFound() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            List<Feed> feeds = new ArrayList<>();
            final int size = 10;
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), 0L));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), 0L));
            feeds.add(new FeedThread(teamPlace.getId(), new Content("Hello"), 0L));

            testFixtureBuilder.buildFeeds(feeds);

            //when & then
            assertThatThrownBy(() -> feedThreadService.firstRead(teamPlace.getId(), size))
                    .isInstanceOf(MemberException.MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }
}
