package team.teamby.teambyteam.notice.acceptance;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.NoticeFixtures;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.NoticeAcceptanceFixtures.POST_NOTICE_REQUEST;

public class NoticeAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    @DisplayName("공지 등록 시")
    class RegisterNotice {

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
        @DisplayName("공지 등록에 성공한다")
        void success() {
            // given
            NoticeRegisterRequest request = NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;

            // when
            ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, participatedTeamPlace, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(response.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + participatedTeamPlace.getId() + "/feed/threads/notice/");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "  "})
        @DisplayName("공지 내용 요청 값으로 빈 내용이 들어오면 공지 등록에 실패한다.")
        void failWithBlankContent(final String content) {
            // given
            final NoticeRegisterRequest request = new NoticeRegisterRequest(content);

            // when
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, participatedTeamPlace, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("공지 내용은 빈 값일 수 없습니다.");
            });
        }

        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 아이디로 요청 시 등록이 실패한다.")
        void failWithForbiddenTeamPlace() {
            // given
            final TeamPlace UN_PARTICIPATED_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final NoticeRegisterRequest request = NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;

            // when
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, UN_PARTICIPATED_TEAM_PLACE, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자로 요청 시 등록이 실패한다.")
        void fail() {
            // given
            final NoticeRegisterRequest request = NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;
            final String unauthorizedToken = jwtTokenProvider.generateToken(ROY().getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(unauthorizedToken, participatedTeamPlace, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).contains("조회한 멤버가 존재하지 않습니다.");
            });
        }
    }
}
