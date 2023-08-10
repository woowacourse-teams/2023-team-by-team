package team.teamby.teambyteam.feed.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.FeedThreadFixtures;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.notification.ScheduleNotification;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.GET_FEED_THREAD_FIRST;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.GET_FEED_THREAD_REPEAT;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.POST_FEED_THREAD_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.DELETE_LEAVE_TEAM_PLACE;

public class FeedThreadAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("피드에 스레드 등록 시")
    class PostThread {

        private Member authedMember;
        private TeamPlace participatedTeamPlace;
        private MemberTeamPlace participatedMemberTeamPlace;
        private String authToken;

        @BeforeEach
        void setup() {
            authedMember = testFixtureBuilder.buildMember(PHILIP());
            participatedTeamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            participatedMemberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(authedMember, participatedTeamPlace);
            authToken = jwtTokenProvider.generateAccessToken(authedMember.getEmail().getValue());

        }

        @Test
        @DisplayName("스레드 등록에 성공한다.")
        void success() {
            // given
            final FeedThreadWritingRequest request = FeedThreadFixtures.HELLO_WRITING_REQUEST;

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_REQUEST(authToken, participatedTeamPlace, request);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(response.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + participatedMemberTeamPlace.getTeamPlace().getId() + "/feed/threads");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("스레드 내용으로 빈 내용의 요청이 오면 등록이 실패한다.")
        void failWithBlankContent(final String content) {
            // given
            final FeedThreadWritingRequest request = new FeedThreadWritingRequest(content);

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_REQUEST(authToken, participatedTeamPlace, request);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("스레드 내용이 있어야 합니다.");
            });
        }

        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 아이디로 요청시 등록이 실패한다.")
        void failWithForbiddenTeamPlace() {
            // given
            final TeamPlace UN_PARTICIPATED_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            final FeedThreadWritingRequest request = FeedThreadFixtures.HELLO_WRITING_REQUEST;

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_REQUEST(authToken, UN_PARTICIPATED_TEAM_PLACE, request);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자로 요청시 등록이 실패한다.")
        void failWithUnauthorizedMember() {
            // given
            final FeedThreadWritingRequest request = FeedThreadFixtures.HELLO_WRITING_REQUEST;
            final String unauthorizedToken = jwtTokenProvider.generateAccessToken(ROY().getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_REQUEST(unauthorizedToken, participatedTeamPlace, request);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).contains("조회한 멤버가 존재하지 않습니다.");
            });
        }
    }

    @Nested
    @DisplayName("피드의 스레드 조회 시")
    class GetThread {

        private Member authedMember;
        private TeamPlace participatedTeamPlace;
        private MemberTeamPlace participatedMemberTeamPlace;
        private String authToken;

        @BeforeEach
        void setup() {
            authedMember = testFixtureBuilder.buildMember(PHILIP());
            participatedTeamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            participatedMemberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(authedMember, participatedTeamPlace);
            authToken = jwtTokenProvider.generateAccessToken(authedMember.getEmail().getValue());
        }

        @Test
        @DisplayName("스레드가 하나도 없는 경우 처음 조회 시 빈 리스트를 반환한다.")
        void hasNotFeedsFirstReadSuccess() {
            // given
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads()).isEmpty();
            });
        }

        @Test
        @DisplayName("스레드 조회를 처음한다.")
        void firstReadSuccess() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));

            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(size);
            });
        }

        @Test
        @DisplayName("탈퇴한 소속되지 않은 사용장의 스레드는 (알수없음) 작성자로 생성된다.")
        void successWithUnknownMember() {
            // given
            final Member otherMember = testFixtureBuilder.buildMember(MemberFixtures.SEONGHA());
            final MemberTeamPlace otherMemberTeamPlace = otherMember.participate(participatedTeamPlace);
            testFixtureBuilder.buildMemberTeamPlace(otherMemberTeamPlace);
            final String otherMemberToken = jwtTokenProvider.generateToken(otherMember.getEmail().getValue());

            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            POST_FEED_THREAD_REQUEST(otherMemberToken, participatedTeamPlace, FeedThreadFixtures.HELLO_WRITING_REQUEST);
            DELETE_LEAVE_TEAM_PLACE(otherMemberToken, teamPlaceId);

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(1);
                softly.assertThat(feedsResponse.threads().get(0).authorId()).isNull();
                softly.assertThat(feedsResponse.threads().get(0).authorName()).isEqualTo(Member.UNKNOWN_MEMBER_NAME);
                softly.assertThat(feedsResponse.threads().get(0).profileImageUrl()).isEqualTo(Member.UNKNOWN_MEMBER_PROFILE_URL);
            });
        }

        @Test
        @DisplayName("스레드 조회는 최신 순서로 한다.")
        void readSuccessDESC() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(size);
                softly.assertThat(feedsResponse.threads().get(0).id()).isEqualTo(5);
                softly.assertThat(feedsResponse.threads().get(1).id()).isEqualTo(4);
                softly.assertThat(feedsResponse.threads().get(2).id()).isEqualTo(3);
                softly.assertThat(feedsResponse.threads().get(3).id()).isEqualTo(2);
                softly.assertThat(feedsResponse.threads().get(4).id()).isEqualTo(1);
            });
        }

        @Test
        @DisplayName("처음에 스레드의 개수가 요청 개수보다 작으면 그만큼 가져온다.")
        void firstReadUnderSizeSuccess() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 10;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(insertFeeds.size());
            });
        }

        @Test
        @DisplayName("스레드를 재조회한다.")
        void reReadSuccess() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final Long lastThreadId = 3L;
            final int size = 2;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, teamPlaceId, lastThreadId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(size);
            });
        }

        @Test
        @DisplayName("다음 스레드의 개수가 요청 개수보다 작으면 그만큼 조회한다.")
        void reReadUnderSizeSuccess() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final Long lastThreadId = 3L;
            final int size = 10;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, teamPlaceId, lastThreadId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(2);
            });
        }

        @Test
        @DisplayName("다음 스레드들이 없는 경우 빈 리스트를 반환한다.")
        void hasNotNextFeedsReReadSuccess() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final Long lastThreadId = 1L;
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, teamPlaceId, lastThreadId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads()).isEmpty();
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자가 처음 조회하는 경우 401에러가 발생한다.")
        void unAuthenticationMemberFailFirstRead() {
            // given
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(teamPlaceId, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, teamPlaceId, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST("invalidToken", teamPlaceId, size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자가 재조회하는 경우 401에러가 발생한다.")
        void unAuthenticationMemberFailReRead() {
            // given
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(teamPlaceId, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, teamPlaceId, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;
            final long lastThreadId = 2L;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT("invalidToken", teamPlaceId, lastThreadId, size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }

        @Test
        @DisplayName("참가하지 않은 팀플레이스에 처음 요청하는 경우 403에러가 발생한다.")
        void unParticipatedTeamPlaceMemberFailFirstRead() {
            // given
            final Long invalidTeamPlaceId = 0L;
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(invalidTeamPlaceId, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, invalidTeamPlaceId, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, invalidTeamPlaceId, size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }

        @Test
        @DisplayName("참가하지 않은 팀플레이스에 재요청하는 경우 403에러가 발생한다.")
        void unParticipatedTeamPlaceMemberFailReRead() {
            // given
            final Long invalidTeamPlaceId = 0L;
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(invalidTeamPlaceId, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, invalidTeamPlaceId, new Title("테스트 알림"), new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;
            final long lastThreadId = 2L;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, invalidTeamPlaceId, lastThreadId, size);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }
    }
}
