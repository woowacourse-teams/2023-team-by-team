package team.teamby.teambyteam.teamplace.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_PARTICIPATED_TEAM_PLACES;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.CREATE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.GET_TEAM_PLACE_INVITE_CODE;

public class TeamPlaceAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("팀플레이스 생성시")
    public class CreateTeamPlaceTest {

        @Test
        @DisplayName("생성에 성공하고, 요청한 사용자가 생성된 팀플레이스에 소속된다.")
        void success() {
            // given
            final Member ENDL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final String ENDL_TOKEN = jwtTokenProvider.generateToken(ENDL.getEmail().getValue());
            final String NEW_TEAM_PLACE_NAME = "새로운 팀플레이스";
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest(NEW_TEAM_PLACE_NAME);

            // when
            final ExtractableResponse<Response> createResponse = CREATE_TEAM_PLACE(ENDL_TOKEN, request);

            //then
            final ExtractableResponse<Response> response = GET_PARTICIPATED_TEAM_PLACES(ENDL_TOKEN);
            TeamPlacesResponse teamPlacesResponse = response.body().as(TeamPlacesResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(createResponse.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(createResponse.jsonPath().getLong("teamPlaceId")).isNotNull();
                softly.assertThat(teamPlacesResponse.teamPlaces()).hasSize(1);
                softly.assertThat(teamPlacesResponse.teamPlaces().get(0).displayName()).isEqualTo(NEW_TEAM_PLACE_NAME);
            });
        }

        @Test
        @DisplayName("잘못된 인증 토큰으로 요청시 실패한다.")
        void failWithWrongToken() {
            // given
            final String WRONG_TOKEN = "12j40jf390.0we9ru2i3hr8.912jrkejfi23j";
            final String NEW_TEAM_PLACE_NAME = "새로운 팀플레이스";
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest(NEW_TEAM_PLACE_NAME);

            // when
            final ExtractableResponse<Response> response = CREATE_TEAM_PLACE(WRONG_TOKEN, request);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }
    }

    @Nested
    @DisplayName("팀플레이스 초대코드 조회시")
    public class TeamPlaceInviteCodeTest {

        @Test
        @DisplayName("팀플레이스에 초대코드가 이미 있는 경우 해당 초대코드를 가져온다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final String PHILIP_TOKEN = jwtTokenProvider.generateToken(PHILIP.getEmail().getValue());
            final TeamPlaceInviteCodeResponse generatedCodeResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, teamPlace.getId()).as(TeamPlaceInviteCodeResponse.class);

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, teamPlace.getId());

            //then
            final TeamPlaceInviteCodeResponse codeResponse = extractableResponse.body().as(TeamPlaceInviteCodeResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(generatedCodeResponse).isEqualTo(codeResponse);
            });
        }

        @Test
        @DisplayName("팀플레이스의 초대코드를 처음 조회 하는 경우 생성해서 반환한다.")
        void ifFirstGetInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final String PHILIP_TOKEN = jwtTokenProvider.generateToken(PHILIP.getEmail().getValue());

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, teamPlace.getId());

            //then
            final TeamPlaceInviteCodeResponse codeResponse = extractableResponse.body().as(TeamPlaceInviteCodeResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(codeResponse.teamPlaceId()).isEqualTo(teamPlace.getId());
                softly.assertThat(codeResponse.inviteCode()).isNotEmpty();
            });
        }

        @Test
        @DisplayName("존재하지 않는 팀플레이스의 초대코드를 조회하는 경우 403 에러를 반환한다.")
        void failIfNotExistTeamPlaceId() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final String PHILIP_TOKEN = jwtTokenProvider.generateToken(PHILIP.getEmail().getValue());
            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, notExistTeamPlaceId);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }

        @Test
        @DisplayName("참가하지 않은 팀플레이스의 초대코드를 조회하는 경우 403 에러를 반환한다.")
        void failIfNotParticipatedTeamPlace() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final String PHILIP_TOKEN = jwtTokenProvider.generateToken(PHILIP.getEmail().getValue());
            final Long notParticipatedTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, notParticipatedTeamPlaceId);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }

        @Test
        @DisplayName("잘못된 인증 토큰으로 요청시 401 에러를 반환한다.")
        void failWithWrongToken() {
            // given
            final String WRONG_TOKEN = "12j40jf390.0we9ru2i3hr8.912jrkejfi23j";
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(WRONG_TOKEN, teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }
    }
}