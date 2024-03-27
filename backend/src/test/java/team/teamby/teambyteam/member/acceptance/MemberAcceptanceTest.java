package team.teamby.teambyteam.member.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.common.fixtures.TokenFixtures;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.application.dto.MemberUpdateRequest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ENDEL;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.DELETE_ACCOUNT;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.DELETE_LEAVE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_MY_INFORMATION;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_PARTICIPATED_TEAM_PLACES;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.PARTICIPATE_TEAM_PLACE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.UPDATE_MEMBER_INFORMATION;

public class MemberAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("내 정보 조회시")
    class GetMyInformation {

        @Test
        @DisplayName("내 정보 조회에 성공한다.")
        void success() {
            // given
            final Member AUTHORIZED_MEMBER = testFixtureBuilder.buildMember(PHILIP());
            final String TOKEN = jwtTokenProvider.generateAccessToken(AUTHORIZED_MEMBER.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = GET_MY_INFORMATION(TOKEN);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(response.jsonPath().getLong("id")).isEqualTo(AUTHORIZED_MEMBER.getId());
                softly.assertThat(response.jsonPath().getString("name")).isEqualTo(AUTHORIZED_MEMBER.getName().getValue());
                softly.assertThat(response.jsonPath().getString("profileImageUrl")).isEqualTo(AUTHORIZED_MEMBER.getProfileImageUrl().getValue());
                softly.assertThat(response.jsonPath().getString("email")).isEqualTo(AUTHORIZED_MEMBER.getEmail().getValue());
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자의 요청에서 실패한다.")
        void failWithUnauthorizedMember() {
            // given

            // when
            final ExtractableResponse<Response> response = GET_MY_INFORMATION(TokenFixtures.MALFORMED_JWT_TOKEN);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }
    }

    @Nested
    @DisplayName("사용자가 소속된 팀플레이스들의 정보를 조회시")
    class GetParticipatedTeamPlaces {

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(ENDEL());
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
            assertSoftly(softly -> {
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
            final Member ENDEL = testFixtureBuilder.buildMember(ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.JAPANESE_TEAM_PLACE());
            final TeamPlace STATICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.STATICS_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, STATICS_TEAM_PLACE);

            final Member unAuthorizedMember = PHILIP();
            final String UNAUTHORIZED_TOKEN = jwtTokenProvider.generateAccessToken(unAuthorizedMember.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = GET_PARTICIPATED_TEAM_PLACES(UNAUTHORIZED_TOKEN);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }
    }

    @Nested
    @DisplayName("사용자가 팀플레이스 탈퇴 요청시")
    class LeaveTeamPlace {

        @Test
        @DisplayName("팀플레이스 탈퇴에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final String ENDEL_TOKEN = jwtTokenProvider.generateAccessToken(ENDEL.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(ENDEL_TOKEN, ENGLISH_TEAM_PLACE.getId());

            //then
            final TeamPlacesResponse teamPlacesResponse = GET_PARTICIPATED_TEAM_PLACES(ENDEL_TOKEN).body().as(TeamPlacesResponse.class);
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
                softly.assertThat(teamPlacesResponse.teamPlaces()).hasSize(0);
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자로 요청시 실패한다.")
        void failWithUnAuthorizedMember() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final String UNAUTHORIZED_TOKEN = "1232irpjsdigjadf.asdf9p23jrisjfajdiuw.dsafih23rhoiwejoi";

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(UNAUTHORIZED_TOKEN, ENGLISH_TEAM_PLACE.getId());

            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }

        @Test
        @DisplayName("소속되지 않은 팀플레이스의 탈퇴 요청시 실패한다.")
        void failWithUnParticipatedTeamPlace() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.JAPANESE_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final String ENDEL_TOKEN = jwtTokenProvider.generateAccessToken(ENDEL.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = DELETE_LEAVE_TEAM_PLACE(ENDEL_TOKEN, JAPANESE_TEAM_PLACE.getId());

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }
    }

    @Nested
    @DisplayName("사용자가 참여코드로 팀플레이스 참가 시")
    class ParticipantTeamPlace {

        @Test
        @DisplayName("참여에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(new TeamPlaceInviteCode(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, inviteCode);

            //then
            TeamPlaceParticipantResponse teamPlaceParticipantResponse = response.body().as(TeamPlaceParticipantResponse.class);
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(teamPlaceParticipantResponse.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("이미 참여한 팀플레이스 기준으로 응답한다.")
        void successIfDuplicateRequest() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(new TeamPlaceInviteCode(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, inviteCode);

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, inviteCode);

            //then
            TeamPlaceParticipantResponse teamPlaceParticipantResponse = response.body().as(TeamPlaceParticipantResponse.class);
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(teamPlaceParticipantResponse.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("없는 참여코드로 요청 시 예외를 반환한다.")
        void failIfNotExistsInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final String invalidInviteCode = "aaaaaaaa";

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, invalidInviteCode);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
            });
        }

        @Test
        @DisplayName("8자가 아닌 초대코드로 요청 시 예외를 반환한다.")
        void failIfInvalidInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final String invalidInviteCode = "aaaa";

            // when
            final ExtractableResponse<Response> response = PARTICIPATE_TEAM_PLACE_REQUEST(PHILIP_TOKEN, invalidInviteCode);

            //then
            assertSoftly(softly -> {
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
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }
    }

    @Nested
    @DisplayName("사용자 이름 정보 수정 시")
    class updateMemberInformation {

        @Autowired
        MemberRepository memberRepository;

        @Test
        @DisplayName("이름 수정에 성공한다.")
        void success() {
            // given
            final Member AUTHORIZED_MEMBER = testFixtureBuilder.buildMember(PHILIP());
            final String VALID_TOKEN = jwtTokenProvider.generateAccessToken(AUTHORIZED_MEMBER.getEmail().getValue());
            final MemberUpdateRequest request = new MemberUpdateRequest("양재필");

            // when
            final ExtractableResponse<Response> response = UPDATE_MEMBER_INFORMATION(VALID_TOKEN, request);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        }

        @Test
        @DisplayName("잘못된 토큰의 경우 실패한다.")
        void failWithWrongToken() {
            // given
            final String MAL_FORMED_JWT_TOKEN = TokenFixtures.MALFORMED_JWT_TOKEN;
            final MemberUpdateRequest request = new MemberUpdateRequest("김덕우");

            // when
            final ExtractableResponse<Response> response = UPDATE_MEMBER_INFORMATION(MAL_FORMED_JWT_TOKEN, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }

        @Test
        @DisplayName("등록되지 않은 사용자로 요청시 실패한다.")
        void failWithUnAuthorizedMember() {
            // given
            final Member UTHORIZED_MEMBER = testFixtureBuilder.buildMember(ROY());
            final TeamPlace PARTICIPATED_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(UTHORIZED_MEMBER, PARTICIPATED_TEAM_PLACE);
            final MemberUpdateRequest request = new MemberUpdateRequest("김덕우");

            final Member UNAUTHORIZED_MEMBER = PHILIP();
            final String UNAUTHORIZED_TOKEN = jwtTokenProvider.generateAccessToken(UNAUTHORIZED_MEMBER.getEmail().getValue());

            // when
            final ExtractableResponse<Response> response = UPDATE_MEMBER_INFORMATION(UNAUTHORIZED_TOKEN, request);

            //then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "   "})
        @DisplayName("변경할 사용자명이 빈값일 경우 실패한다.")
        void failWithEmptyMemberNameInfo(final String memberNameToUpdate) {
            // given
            final Member UTHORIZED_MEMBER = testFixtureBuilder.buildMember(ROY());
            final TeamPlace PARTICIPATED_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(UTHORIZED_MEMBER, PARTICIPATED_TEAM_PLACE);
            final String VALID_TOKEN = jwtTokenProvider.generateAccessToken(UTHORIZED_MEMBER.getEmail().getValue());
            final MemberUpdateRequest emptyValueRequest = new MemberUpdateRequest(memberNameToUpdate);

            // when
            final ExtractableResponse<Response> response = UPDATE_MEMBER_INFORMATION(VALID_TOKEN, emptyValueRequest);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        @DisplayName("변경할 사용자 이름이 20자를 초과활 경우 실패한다. ")
        void failWithNameLength() {
            // given
            final Member AUTHORIZED_MEMBER = testFixtureBuilder.buildMember(PHILIP());

            final String VALID_TOKEN = jwtTokenProvider.generateAccessToken(AUTHORIZED_MEMBER.getEmail().getValue());
            final String wrongNameToChange = "a".repeat(21);
            final MemberUpdateRequest request = new MemberUpdateRequest(wrongNameToChange);

            // when
            final ExtractableResponse<Response> response = UPDATE_MEMBER_INFORMATION(VALID_TOKEN, request);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        @DisplayName("변경할 사용자 이름의 앞 뒤에 공백이 있을 경우 공백이 제거된다.")
        void successWithTrimmedNameToChange() {
            // given
            final Member AUTHORIZED_MEMBER = testFixtureBuilder.buildMember(PHILIP());
            final String VALID_TOKEN = jwtTokenProvider.generateAccessToken(AUTHORIZED_MEMBER.getEmail().getValue());
            final String nameToChange = " 재피리 ";
            final MemberUpdateRequest request = new MemberUpdateRequest(nameToChange);
            final String changedName = "재피리";

            // when
            final ExtractableResponse<Response> response = UPDATE_MEMBER_INFORMATION(VALID_TOKEN, request);
            final Member member = memberRepository.findByEmail(AUTHORIZED_MEMBER.getEmail()).get();

            // then
            assertThat(member.getName().getValue()).isEqualTo(changedName);
        }
    }

    @Nested
    @DisplayName("사용자가 탈퇴 요청시")
    class DeleteAccount {

        @Test
        @DisplayName("탈퇴에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final String PHILIP_ACCESS_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final String PHILIP_REFRESH_TOKEN = jwtTokenProvider.generateRefreshToken(PHILIP.getEmail().getValue());
            testFixtureBuilder.buildToken(TokenFixtures.TOKEN_ENTITY(PHILIP, PHILIP_REFRESH_TOKEN));

            // when
            final ExtractableResponse<Response> response = DELETE_ACCOUNT(PHILIP_ACCESS_TOKEN);

            //then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
        }

        @Test
        @DisplayName("인증되지 않은 사용자로 요청시 실패한다.")
        void failWithUnAuthorizedMember() {
            // given
            final String mail = "notRegistered@gmail.com";
            final String NOT_REGISTERED_MEMBER_TOKEN = jwtTokenProvider.generateAccessToken(mail);

            // when
            final ExtractableResponse<Response> response = DELETE_ACCOUNT(NOT_REGISTERED_MEMBER_TOKEN);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }

        @Test
        @DisplayName("잘못된 인증 토큰으로 요청시 401 에러를 반환한다.")
        void failWithWrongToken() {
            // given
            final String WRONG_TOKEN = "12j40jf390.0we9ru2i3hr8.912jrkejfi23j";

            // when
            final ExtractableResponse<Response> response = DELETE_ACCOUNT(WRONG_TOKEN);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }
    }
}
