package team.teamby.teambyteam.notice.acceptance;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.NoticeFixtures;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.*;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.NoticeAcceptanceFixtures.GET_NOTICE_REQUEST;
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
            final NoticeRegisterRequest request = NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;

            // when
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, participatedTeamPlace.getId(), request);

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
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, participatedTeamPlace.getId(), request);

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
            final TeamPlace UN_PARTICIPATED_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE()));
            final NoticeRegisterRequest request = NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;

            // when
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, UN_PARTICIPATED_TEAM_PLACE.getId(), request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }

        @Test
        @DisplayName("존재하지 않는 팀플레이스 아이디로 요청 시 등록에 실패한다.")
        void failWithNonExistTeamPlace() {
            // given
            Long nonExistTeamPlaceId = -1L;
            final NoticeRegisterRequest request = NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;

            // when
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(authToken, nonExistTeamPlaceId, request);

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
            final ExtractableResponse<Response> response = POST_NOTICE_REQUEST(unauthorizedToken, participatedTeamPlace.getId(), request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).contains("조회한 멤버가 존재하지 않습니다.");
            });
        }
    }

    @Nested
    @DisplayName("공지 조회 시")
    class FindNotice {

        public static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        private Member authedMember;
        private TeamPlace participatedTeamPlace;
        private MemberTeamPlace participatedMemberTeamPlace;
        private String authToken;
        private List<Notice> registeredNotices;

        @BeforeEach
        void setup() {
            authedMember = testFixtureBuilder.buildMember(PHILIP());
            participatedTeamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            participatedMemberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(authedMember, participatedTeamPlace);
            authToken = jwtTokenProvider.generateToken(authedMember.getEmail().getValue());
            Notice notice1 = NOTICE_1ST(participatedMemberTeamPlace.getId(), authedMember.getId());
            Notice notice2 = NOTICE_2ND(participatedMemberTeamPlace.getId(), authedMember.getId());
            Notice notice3 = NOTICE_3RD(participatedMemberTeamPlace.getId(), authedMember.getId());
            registeredNotices = testFixtureBuilder.buildNotices(List.of(notice1, notice2, notice3));
        }

        @Test
        @DisplayName("가장 최근에 등록된 공지가 조회된다.")
        void successFindingNotice() {
            //given
            final Notice recentRegisteredNotice = registeredNotices.get(registeredNotices.size() - 1);

            // when
            final ExtractableResponse<Response> response = GET_NOTICE_REQUEST(authToken, participatedTeamPlace.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(response.jsonPath().getLong("id")).isEqualTo(recentRegisteredNotice.getId());
                softly.assertThat(response.jsonPath().getString("content")).isEqualTo(recentRegisteredNotice.getContent().getValue());
                softly.assertThat(response.jsonPath().getLong("authorId")).isEqualTo(authedMember.getId());
                softly.assertThat(response.jsonPath().getString("authorName")).isEqualTo(authedMember.getName().getValue());
                softly.assertThat(response.jsonPath().getString("profileImageUrl")).isEqualTo(authedMember.getProfileImageUrl().getValue());
                softly.assertThat(response.jsonPath().getString("createdAt")).isEqualTo(DATE_TIME_FORMATTER.format(recentRegisteredNotice.getCreatedAt()));
            });
        }

        @Test
        @DisplayName("팀플레이스에 등록 된 공지가 없을 경우 빈 값이 반환된다.")
        void successFindingEmptyNotice() {
            // given
            final Member additionalMember = testFixtureBuilder.buildMember(ROY());
            final TeamPlace additionalTeamPlace = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final MemberTeamPlace additionalMemberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(additionalMember, additionalTeamPlace);
            final String additionalToken = jwtTokenProvider.generateToken(additionalMember.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = GET_NOTICE_REQUEST(additionalToken, additionalTeamPlace.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(StringUtils.isBlank(response.body().asString())).isTrue();
            });
        }

        @Test
        @DisplayName("존재하지 않는 팀플레이스로 공지 조회 요청 시 예외가 발생한다.")
        void failWithNonExistTeamPlace() {
            // given
            final Long nonExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> response = GET_NOTICE_REQUEST(authToken, nonExistTeamPlaceId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }

        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 Id로 공지 조회 요청 시 예외가 발생한다.")
        void failWithForbiddenTeamPlace() {
            // given
            final Member forbiddenMember = testFixtureBuilder.buildMember(ROY());
            final String forbiddenToken = jwtTokenProvider.generateToken(forbiddenMember.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = GET_NOTICE_REQUEST(forbiddenToken, participatedTeamPlace.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }
    }
}
