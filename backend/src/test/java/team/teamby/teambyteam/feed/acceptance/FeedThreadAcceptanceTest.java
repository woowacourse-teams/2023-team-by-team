package team.teamby.teambyteam.feed.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.FeedThreadFixtures;
import team.teamby.teambyteam.common.fixtures.FeedThreadImageFixtures;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.cache.RecentFeedCache;
import team.teamby.teambyteam.feed.domain.notification.schedulenotification.ScheduleNotification;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.OVER_SIZE_PNG_FILE;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_FILE1;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_FILE2;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_FILE3;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_FILE4;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_WRONG_EXTENSION_FILE;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.GET_FEED_THREAD_FIRST;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.GET_FEED_THREAD_REPEAT;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.POST_FEED_THREAD_ONLY_CONTENT_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.POST_FEED_THREAD_ONLY_IMAGE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.DELETE_LEAVE_TEAM_PLACE;

public class FeedThreadAcceptanceTest extends AcceptanceTest {

    @MockBean
    private FileStorageManager fileStorageManager;

    @MockBean
    private RecentFeedCache recentFeedCache;

    @SpyBean
    private Clock clock;

    @BeforeEach
    void setup() {
        given(recentFeedCache.isCached(any(Long.class), any(int.class)))
                .willReturn(false);
    }

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
            given(fileStorageManager.upload(any(MultipartFile.class), any(String.class), any(String.class)))
                    .willReturn("https://s3://seongha-seeik");
        }

        @Test
        @DisplayName("이미지와 내용이 있을 때 스레드 등록에 성공한다.")
        void successWhenImageAndContentExist() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2), "content");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(response.header(HttpHeaders.LOCATION)).contains(
                        "/api/team-place/" + participatedMemberTeamPlace.getTeamPlace().getId() + "/feed/threads");
            });
        }

        @Test
        @DisplayName("이미지만 있을 때 스레드 등록에 성공한다.")
        void successWhenOnlyImageExist() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_ONLY_IMAGE_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2));

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(response.header(HttpHeaders.LOCATION)).contains(
                        "/api/team-place/" + participatedMemberTeamPlace.getTeamPlace().getId() + "/feed/threads");
            });
        }

        @Test
        @DisplayName("내용만 있을 때 스레드 등록에 성공한다.")
        void successWhenOnlyContentExist() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_ONLY_CONTENT_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    "content");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(response.header(HttpHeaders.LOCATION)).contains(
                        "/api/team-place/" + participatedMemberTeamPlace.getTeamPlace().getId() + "/feed/threads");
            });
        }

        @Test
        @DisplayName("스레드 내용으로 빈 내용과 빈 이미지의의 요청이 오면 등록이 실패한다.")
        void failWithEmptyContentAndImages() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    Collections.emptyList(), "");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("내용과 이미지가 모두 존재하지 않습니다.");
            });
        }

        @Test
        @DisplayName("이미지 개수가 4개보다 많은 요청이 오면 등록이 실패한다.")
        void failWhenImageOverCount() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_ONLY_IMAGE_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2, UNDER_SIZE_PNG_FILE3, UNDER_SIZE_PNG_FILE4)
            );

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("허용된 이미지의 개수를 초과했습니다.");
            });
        }

        @Test
        @DisplayName("이미지 크기가 허용된 크기보다 큰 요청이 오면 등록이 실패한다.")
        void failWhenImageOverSize() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_ONLY_IMAGE_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    List.of(OVER_SIZE_PNG_FILE));

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("Maximum upload size exceeded");
            });
        }

        @Test
        @DisplayName("이미지 확장자가 허용되지 않은 확장자의 요청이 오면 등록이 실패한다.")
        void failWhenNotAllowedImageExtension() {
            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_ONLY_IMAGE_REQUEST(authToken,
                    participatedTeamPlace.getId(),
                    List.of(UNDER_SIZE_WRONG_EXTENSION_FILE));

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("허용되지 않은 확장자입니다.");
            });
        }

        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 아이디로 요청시 등록이 실패한다.")
        void failWithForbiddenTeamPlace() {
            // given
            final TeamPlace UN_PARTICIPATED_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST(authToken,
                    UN_PARTICIPATED_TEAM_PLACE.getId(), List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2), "content");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자로 요청시 등록이 실패한다.")
        void failWithUnauthorizedMember() {
            // given
            final String unauthorizedToken = jwtTokenProvider.generateAccessToken(ROY().getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST(unauthorizedToken,
                    participatedTeamPlace.getId(), List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2), "content");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
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
            given(fileStorageManager.upload(any(MultipartFile.class), any(String.class), any(String.class)))
                    .willReturn("https://s3://seongha-seeik");
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
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads()).isEmpty();
            });
        }

        @Test
        @DisplayName("스레드 조회를 처음한다.")
        void firstReadSuccess() {
            // given
            POST_FEED_THREAD_ONLY_IMAGE_REQUEST(authToken, participatedTeamPlace.getId(), List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2));
            POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST(authToken, participatedTeamPlace.getId(), List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2), FeedThreadFixtures.CONTENT_AND_IMAGE);
            POST_FEED_THREAD_ONLY_CONTENT_REQUEST(authToken, participatedTeamPlace.getId(), FeedThreadFixtures.CONTENT_ONLY_AND_IMAGE_EMPTY);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 3;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            final FeedsResponse feedsResponse = response.as(FeedsResponse.class);
            final FeedResponse feedResponse3 = feedsResponse.threads().get(0);
            final FeedResponse feedResponse2 = feedsResponse.threads().get(1);
            final FeedResponse feedResponse1 = feedsResponse.threads().get(2);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(3);
                softly.assertThat(feedResponse1.images().size()).isEqualTo(2);
                softly.assertThat(feedResponse2.images().size()).isEqualTo(2);
                softly.assertThat(feedResponse3.images().size()).isEqualTo(0);
            });
        }

        @Test
        @DisplayName("이미지가 만료되는 경우에 조회한다.")
        void readIfImageExpired() {
            // given
            POST_FEED_THREAD_ONLY_IMAGE_REQUEST(authToken, participatedTeamPlace.getId(), List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2));

            final Instant expiredDate = LocalDateTime.now().plusDays(FeedThreadImageFixtures.IMAGE_EXPIRATION_DATE).plusNanos(1).toInstant(ZoneOffset.systemDefault().getRules().getOffset(LocalDateTime.now()));
            given(clock.instant()).willReturn(expiredDate);

            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            final FeedsResponse feedsResponse = response.as(FeedsResponse.class);
            final FeedResponse feedResponse = feedsResponse.threads().get(0);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(1);
                softly.assertThat(feedResponse.images().size()).isEqualTo(2);
                softly.assertThat(feedResponse.images().get(0).isExpired()).isTrue();
                softly.assertThat(feedResponse.images().get(1).isExpired()).isTrue();
            });
        }

        @Test
        @DisplayName("탈퇴한 소속되지 않은 사용자의 스레드는 (알수없음) 작성자로 생성된다.")
        void successWithUnknownMember() {
            // given
            final Member otherMember = testFixtureBuilder.buildMember(MemberFixtures.SEONGHA());
            final MemberTeamPlace otherMemberTeamPlace = otherMember.participate(participatedTeamPlace);
            testFixtureBuilder.buildMemberTeamPlace(otherMemberTeamPlace);
            final String otherMemberToken = jwtTokenProvider.generateAccessToken(otherMember.getEmail().getValue());

            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            POST_FEED_THREAD_IMAGE_AND_CONTENT_REQUEST(otherMemberToken, participatedTeamPlace.getId(),
                    List.of(UNDER_SIZE_PNG_FILE1, UNDER_SIZE_PNG_FILE2), "content");

            DELETE_LEAVE_TEAM_PLACE(otherMemberToken, teamPlaceId);

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(feedsResponse.threads().size()).isEqualTo(1);
                softly.assertThat(feedsResponse.threads().get(0).authorId()).isNull();
                softly.assertThat(feedsResponse.threads().get(0).authorName()).isEqualTo(Member.UNKNOWN_MEMBER_NAME);
                softly.assertThat(feedsResponse.threads().get(0).profileImageUrl())
                        .isEqualTo(Member.UNKNOWN_MEMBER_PROFILE_URL);
            });
        }

        @Test
        @DisplayName("스레드 조회는 최신 순서로 한다.")
        void readSuccessDESC() {
            // given
            List<Feed> insertFeeds = new ArrayList<>();
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final int size = 10;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, teamPlaceId, size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final Long lastThreadId = 3L;
            final int size = 2;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, teamPlaceId, lastThreadId,
                    size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(3L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final Long lastThreadId = 3L;
            final int size = 10;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, teamPlaceId, lastThreadId,
                    size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(2L, 1L, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final Long teamPlaceId = participatedMemberTeamPlace.getId();
            final Long lastThreadId = 1L;
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, teamPlaceId, lastThreadId,
                    size);
            FeedsResponse feedsResponse = response.as(FeedsResponse.class);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, teamPlaceId, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST("invalidToken", teamPlaceId, size);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(new ScheduleCreateEvent(1L, teamPlaceId, new Title("테스트 알림"),
                    new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;
            final long lastThreadId = 2L;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT("invalidToken", teamPlaceId,
                    lastThreadId, size);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(
                    new ScheduleCreateEvent(1L, invalidTeamPlaceId, new Title("테스트 알림"),
                            new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_FIRST(authToken, invalidTeamPlaceId, size);

            //then
            assertSoftly(softly -> {
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
            insertFeeds.add(ScheduleNotification.from(
                    new ScheduleCreateEvent(1L, invalidTeamPlaceId, new Title("테스트 알림"),
                            new Span(LocalDateTime.now(), LocalDateTime.now()))));
            testFixtureBuilder.buildFeeds(insertFeeds);
            final int size = 5;
            final long lastThreadId = 2L;

            // when
            final ExtractableResponse<Response> response = GET_FEED_THREAD_REPEAT(authToken, invalidTeamPlaceId,
                    lastThreadId, size);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }
    }
}
