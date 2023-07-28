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
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.FeedThreadAcceptanceFixtures.POST_FEED_THREAD_REQUEST;

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
            authToken = jwtTokenProvider.generateToken(authedMember.getEmail().getValue());

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
            final String unauthorizedToken = jwtTokenProvider.generateToken(ROY().getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = POST_FEED_THREAD_REQUEST(unauthorizedToken, participatedTeamPlace, request);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).contains("조회한 멤버가 존재하지 않습니다.");
            });
        }

    }

}
