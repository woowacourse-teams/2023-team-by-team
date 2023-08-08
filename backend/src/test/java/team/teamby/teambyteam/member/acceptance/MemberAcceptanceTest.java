package team.teamby.teambyteam.member.acceptance;

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
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.DELETE_LEAVE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_PARTICIPATED_TEAM_PLACES;

public class MemberAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("사용자가 소속된 팀플레이스들의 정보를 조회시")
    class GetParticipatedTeamPlaces {

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.JAPANESE_TEAM_PLACE());
            final TeamPlace STATICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.STATICS_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, STATICS_TEAM_PLACE);

            final String ENDEL_TOKEN = jwtTokenProvider.generateToken(ENDEL.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = GET_PARTICIPATED_TEAM_PLACES(ENDEL_TOKEN);

            //then
            final TeamPlacesResponse teamPlacesResponse = response.body().as(TeamPlacesResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(teamPlacesResponse.teamPlaces()).hasSize(3);
                softly.assertThat(teamPlacesResponse.teamPlaces().get(0).id()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
                softly.assertThat(teamPlacesResponse.teamPlaces().get(0).displayName()).isEqualTo(ENGLISH_TEAM_PLACE.getName().getValue());
                softly.assertThat(teamPlacesResponse.teamPlaces().get(1).id()).isEqualTo(JAPANESE_TEAM_PLACE.getId());
                softly.assertThat(teamPlacesResponse.teamPlaces().get(1).displayName()).isEqualTo(JAPANESE_TEAM_PLACE.getName().getValue());
                softly.assertThat(teamPlacesResponse.teamPlaces().get(2).id()).isEqualTo(STATICS_TEAM_PLACE.getId());
                softly.assertThat(teamPlacesResponse.teamPlaces().get(2).displayName()).isEqualTo(STATICS_TEAM_PLACE.getName().getValue());
            });
        }

        @Test
        @DisplayName("등록되지 않은 사용자로 요청시 실패한다.")
        void failWithUnAuthorizedMember() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.JAPANESE_TEAM_PLACE());
            final TeamPlace STATICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.STATICS_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, STATICS_TEAM_PLACE);

            final Member unAuthorizedMember = MemberFixtures.PHILIP();
            final String UNAUTHORIZED_TOKEN = jwtTokenProvider.generateToken(unAuthorizedMember.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = GET_PARTICIPATED_TEAM_PLACES(UNAUTHORIZED_TOKEN);

            //then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
        }
    }

    @Nested
    @DisplayName("사용자가 팀플레이스 탈퇴 요청시")
    class LeaveTeamPlace {

        @Test
        @DisplayName("팀플레이스 탈퇴에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final String ENDEL_TOKEN = jwtTokenProvider.generateToken(ENDEL.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(ENDEL_TOKEN, ENGLISH_TEAM_PLACE.getId());

            //then
            final TeamPlacesResponse teamPlacesResponse = GET_PARTICIPATED_TEAM_PLACES(ENDEL_TOKEN).body().as(TeamPlacesResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
                softly.assertThat(teamPlacesResponse.teamPlaces()).hasSize(0);
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자로 요청시 실패한다.")
        void failWithUnAuthorizedMember() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final String UNAUTHORIZED_TOKEN = "1232irpjsdigjadf.asdf9p23jrisjfajdiuw.dsafih23rhoiwejoi";

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(UNAUTHORIZED_TOKEN, ENGLISH_TEAM_PLACE.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }

        @Test
        @DisplayName("소속되지 않은 팀플레이스의 탈퇴 요청시 실패한다.")
        void failWithUnParticipatedTeamPlace() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.JAPANESE_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final String ENDEL_TOKEN = jwtTokenProvider.generateToken(ENDEL.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(ENDEL_TOKEN, JAPANESE_TEAM_PLACE.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).contains("가입된 팀플레이스를 찾을 수 없습니다.");
            });
        }
    }
}
