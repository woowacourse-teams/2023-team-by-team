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
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.DELETE_LEAVE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_PARTICIPATED_TEAM_PLACES;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.PARTICIPATE_TEAM_PLACE_REQUEST;

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

            final String ENDEL_TOKEN = jwtTokenProvider.generateAccessToken(ENDEL.getEmail().getValue());

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
            final String UNAUTHORIZED_TOKEN = jwtTokenProvider.generateAccessToken(unAuthorizedMember.getEmail().getValue());

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

            final String ENDEL_TOKEN = jwtTokenProvider.generateAccessToken(ENDEL.getEmail().getValue());

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

            final String ENDEL_TOKEN = jwtTokenProvider.generateAccessToken(ENDEL.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(ENDEL_TOKEN, JAPANESE_TEAM_PLACE.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }
    }

    @DisplayName("사용자가 참여코드로 팀플레이스 참가 시")
    class ParticipantTeamPlace {

        @Test
        @DisplayName("참여에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(new TeamPlaceInviteCode(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, inviteCode);

            //then
            TeamPlaceParticipantResponse teamPlaceParticipantResponse = response.body().as(TeamPlaceParticipantResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(teamPlaceParticipantResponse.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @DisplayName("이미 참여한 팀플레이스 기준으로 응답한다.")
        void successIfDuplicateRequest() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(new TeamPlaceInviteCode(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, inviteCode);

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, inviteCode);

            //then
            TeamPlaceParticipantResponse teamPlaceParticipantResponse = response.body().as(TeamPlaceParticipantResponse.class);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(teamPlaceParticipantResponse.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("없는 참여코드로 요청 시 예외를 반환한다.")
        void failIfNotExistsInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final String invalidInviteCode = "aaaaaaaa";

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, invalidInviteCode);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
            });
        }

        @Test
        @DisplayName("8자가 아닌 초대코드로 요청 시 예외를 반환한다.")
        void failIfInvalidInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final String invalidInviteCode = "aaaa";

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, invalidInviteCode);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
            });
        }

        @Test
        @DisplayName("잘못된 인증 토큰으로 요청시 401 에러를 반환한다.")
        void failWithWrongToken() {
            // given
            final String WRONG_TOKEN = "12j40jf390.0we9ru2i3hr8.912jrkejfi23j";
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(new TeamPlaceInviteCode(new InviteCode(inviteCode), teamPlace));

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(WRONG_TOKEN, inviteCode);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }
    }
}
