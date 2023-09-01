package team.teamby.teambyteam.teamplace.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.teamplace.application.dto.DisplayMemberNameChangeRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceChangeColorRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMemberResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMembersResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ENDEL;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.SEONGHA;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.EXPIRED_ACCESS_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.MALFORMED_JWT_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.MISSING_CLAIM_ACCESS_TOKEN;
import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_PARTICIPATED_TEAM_PLACES;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.CHANGE_MEMBER_TEAM_PLACE_COLOR;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.CREATE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.GET_MEMBERS_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.GET_TEAM_PLACE_INVITE_CODE;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.PATCH_DISPLAY_MEMBER_NAME_CHANGE;

public class TeamPlaceAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("팀플레이스 생성시")
    public class CreateTeamPlaceTest {

        @Test
        @DisplayName("생성에 성공하고, 요청한 사용자가 생성된 팀플레이스에 소속된다.")
        void success() {
            // given
            final Member ENDL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final String ENDL_TOKEN = jwtTokenProvider.generateAccessToken(ENDL.getEmail().getValue());
            final String NEW_TEAM_PLACE_NAME = "새로운 팀플레이스";
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest(NEW_TEAM_PLACE_NAME);

            // when
            final ExtractableResponse<Response> createResponse = CREATE_TEAM_PLACE(ENDL_TOKEN, request);

            //then
            final ExtractableResponse<Response> response = GET_PARTICIPATED_TEAM_PLACES(ENDL_TOKEN);
            TeamPlacesResponse teamPlacesResponse = response.body().as(TeamPlacesResponse.class);
            assertSoftly(softly -> {
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
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.body().asString()).contains("인증이 실패했습니다.");
            });
        }

        @Test
        @DisplayName("팀플레이스의 이름이 없으면 생성에 실패한다.")
        void failWithBlankTeamPlaceName() {
            // given
            final Member ENDL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final String ENDL_TOKEN = jwtTokenProvider.generateAccessToken(ENDL.getEmail().getValue());
            final String BLANK_NAME = "";
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest(BLANK_NAME);

            // when
            final ExtractableResponse<Response> response = CREATE_TEAM_PLACE(ENDL_TOKEN, request);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("팀플레이스 이름이 있어야 합니다.");
            });
        }

        @Test
        @DisplayName("너무 긴 이름(30자 초과)의 팀플레이스는 생성할 수 없다.")
        void failWithLongTeamPlaceName() {
            final Member ENDL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final String ENDL_TOKEN = jwtTokenProvider.generateAccessToken(ENDL.getEmail().getValue());
            final String BLANK_NAME = "a".repeat(31);
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest(BLANK_NAME);

            // when
            final ExtractableResponse<Response> response = CREATE_TEAM_PLACE(ENDL_TOKEN, request);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.body().asString()).contains("팀 플레이스 이름의 길이가 최대 이름 길이를 초과했습니다.");
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
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final TeamPlaceInviteCodeResponse generatedCodeResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, teamPlace.getId()).as(TeamPlaceInviteCodeResponse.class);

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, teamPlace.getId());

            //then
            final TeamPlaceInviteCodeResponse codeResponse = extractableResponse.body().as(TeamPlaceInviteCodeResponse.class);
            assertSoftly(softly -> {
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
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, teamPlace.getId());

            //then
            final TeamPlaceInviteCodeResponse codeResponse = extractableResponse.body().as(TeamPlaceInviteCodeResponse.class);
            assertSoftly(softly -> {
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
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, notExistTeamPlaceId);

            //then
            assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }

        @Test
        @DisplayName("참가하지 않은 팀플레이스의 초대코드를 조회하는 경우 403 에러를 반환한다.")
        void failIfNotParticipatedTeamPlace() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final String PHILIP_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
            final Long notParticipatedTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> extractableResponse = GET_TEAM_PLACE_INVITE_CODE(PHILIP_TOKEN, notParticipatedTeamPlaceId);

            //then
            assertSoftly(softly -> {
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
            assertSoftly(softly -> {
                softly.assertThat(extractableResponse.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }
    }

    @Nested
    @DisplayName("팀 플레이스 참여 멤버 조회 시")
    class FindMembers {

        private Member member1;
        private Member member2;
        private Member member3;
        private Member member4;
        private TeamPlace teamPlace;
        private MemberTeamPlace memberTeamPlace1;
        private MemberTeamPlace memberTeamPlace2;
        private MemberTeamPlace memberTeamPlace3;
        private MemberTeamPlace memberTeamPlace4;

        @BeforeEach
        void setUp() {
            member1 = testFixtureBuilder.buildMember(PHILIP());
            member2 = testFixtureBuilder.buildMember(ROY());
            member3 = testFixtureBuilder.buildMember(SEONGHA());
            member4 = testFixtureBuilder.buildMember(ENDEL());
            teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            memberTeamPlace1 = testFixtureBuilder.buildMemberTeamPlace(member1, teamPlace);
            memberTeamPlace2 = testFixtureBuilder.buildMemberTeamPlace(member2, teamPlace);
            memberTeamPlace3 = testFixtureBuilder.buildMemberTeamPlace(member3, teamPlace);
            memberTeamPlace4 = testFixtureBuilder.buildMemberTeamPlace(member4, teamPlace);
        }

        @Test
        @DisplayName("팀 플레이스 참여 멤버 조회에 성공한다.")
        void success() {
            // given
            final List<MemberTeamPlace> memberTeamPlaces = List.of(memberTeamPlace1, memberTeamPlace2, memberTeamPlace3, memberTeamPlace4);
            final List<TeamPlaceMemberResponse> teamPlaceMembers = memberTeamPlaces.stream()
                    .map(memberTeamPlace -> TeamPlaceMemberResponse.of(memberTeamPlace, member1))
                    .toList();

            final TeamPlaceMembersResponse response = TeamPlaceMembersResponse.from(teamPlaceMembers);
            final List<TeamPlaceMemberResponse> expectedResponse = response.members();

            final String accessToken = jwtTokenProvider.generateAccessToken(member1.getEmail().getValue());

            // when
            final ExtractableResponse<Response> membersResponse = GET_MEMBERS_REQUEST(accessToken, teamPlace.getId());
            final List<TeamPlaceMemberResponse> actualResponse = membersResponse.jsonPath().getList("members", TeamPlaceMemberResponse.class);

            // then
            assertSoftly(softly -> {
                softly.assertThat(membersResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(actualResponse).usingRecursiveFieldByFieldElementComparator()
                        .isEqualTo(expectedResponse);
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {EXPIRED_ACCESS_TOKEN, MALFORMED_JWT_TOKEN, MISSING_CLAIM_ACCESS_TOKEN})
        @DisplayName("올바르지 않은 토큰으로 요청하면 실패한다.")
        void failWhenWrongToken(String wrongToken) {
            // when
            final ExtractableResponse<Response> response = GET_MEMBERS_REQUEST(wrongToken, teamPlace.getId());

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
        }

        @Test
        @DisplayName("소속되지 않은 팀 플레이스의 멤버를 조회하면 실패한다.")
        void failWhenNotParticipatedTeamPlace() {
            // given
            final String accessToken = jwtTokenProvider.generateAccessToken(member1.getEmail().getValue());
            long notParticipatedTeamPlaceId = teamPlace.getId() + 1;

            // when
            final ExtractableResponse<Response> response = GET_MEMBERS_REQUEST(accessToken, notParticipatedTeamPlaceId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.jsonPath().getString("error")).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }
    }

    @Nested
    @DisplayName("팀 플레이스 색상 변경 시")
    class ChangeMemberTeamPlaceColor {
        private Member member;
        private TeamPlace teamPlace;
        private MemberTeamPlace memberTeamPlace;

        @BeforeEach
        void setUp() {
            member = testFixtureBuilder.buildMember(SEONGHA());
            teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            memberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
        }

        @Test
        @DisplayName("팀 플레이스 색상 변경에 성공한다.")
        void success() {
            // given
            final int teamPlaceColorToChange = 1;
            final String token = jwtTokenProvider.generateAccessToken(member.getEmail().getValue());
            final Long teamPlaceId = teamPlace.getId();
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(token, teamPlaceId, request);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        }

        @Test
        @DisplayName("존재하지 않는 회원이면 실패한다.")
        void failWhenNotExistMember() {
            // given
            final int teamPlaceColorToChange = 1;
            final String notExistMemberToken = jwtTokenProvider.generateAccessToken("notExistMemberEmail@gmail.com");
            final Long teamPlaceId = teamPlace.getId();
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(notExistMemberToken, teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.jsonPath().getString("error")).contains("조회한 멤버가 존재하지 않습니다.");
            });
        }

        @Test
        @DisplayName("만료된 토큰으로 요청을 보내면 실패한다.")
        void failWhenExpiredToken() {
            // given
            final int teamPlaceColorToChange = 1;
            final String expiredToken = EXPIRED_ACCESS_TOKEN;
            final Long teamPlaceId = teamPlace.getId();
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(expiredToken, teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.jsonPath().getString("error")).isEqualTo("EXPIRED_ACCESS_TOKEN");
            });
        }

        @Test
        @DisplayName("잘못된 토큰 형식으로 요청을 보내면 실패한다.")
        void failWhenWrongToken() {
            // given
            final int teamPlaceColorToChange = 1;
            final String malformedToken = MALFORMED_JWT_TOKEN;
            final Long teamPlaceId = teamPlace.getId();
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(malformedToken, teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.jsonPath().getString("error")).isEqualTo("인증이 실패했습니다.");
            });
        }

        @Test
        @DisplayName("이메일이 누락된 토큰으로 요청을 보내면 실패한다.")
        void failWhenMissingClaimToken() {
            // given
            final int teamPlaceColorToChange = 1;
            final String missingClaimToken = MISSING_CLAIM_ACCESS_TOKEN;
            final Long teamPlaceId = teamPlace.getId();
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(missingClaimToken, teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
                softly.assertThat(response.jsonPath().getString("error")).isEqualTo("인증이 실패했습니다.");
            });
        }

        @ParameterizedTest
        @ValueSource(ints = {-1, 10})
        @DisplayName("요청한 색상 번호가 존재하지 않으면 실패한다.")
        void failWhenNotExistTeamPlaceColor(int notExistTeamPlaceColor) {
            // given
            final String token = jwtTokenProvider.generateAccessToken(member.getEmail().getValue());
            final Long teamPlaceId = teamPlace.getId();
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(notExistTeamPlaceColor);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(token, teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(response.jsonPath().getString("error")).contains("존재하지 않는 팀 플레이스 색상입니다.");
            });
        }

        @Test
        @DisplayName("회원이 소속된 팀플레이스가 아니라면 실패한다.")
        void failWhenNotParticipatedTeamPlace() {
            // given
            final int teamPlaceColorToChange = 1;
            final String token = jwtTokenProvider.generateAccessToken(member.getEmail().getValue());
            final Long notParticipatedTeamPlaceId = 2L;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            final ExtractableResponse<Response> response = CHANGE_MEMBER_TEAM_PLACE_COLOR(token, notParticipatedTeamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.jsonPath().getString("error")).contains("접근할 수 없는 팀플레이스입니다.");
            });
        }
    }

    @Nested
    @DisplayName("팀플래에스 내에서 보일 이름 변경 요청시")
    class ChangeDisplayMemberName {


        private Member PHILIP;
        private TeamPlace STATICS_TEAM_PLACE;
        private String PHILIP_ACCESS_TOKEN;

        @BeforeEach
        void setup() {
            PHILIP = testFixtureBuilder.buildMember(PHILIP());
            STATICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.STATICS_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, STATICS_TEAM_PLACE);
            PHILIP_ACCESS_TOKEN = jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue());
        }

        @Test
        @DisplayName("변경 요쳥에 성공한다.")
        void success() {
            // given
            final String NEW_NAME = "새로온 필립";
            final DisplayMemberNameChangeRequest requestBody = new DisplayMemberNameChangeRequest(NEW_NAME);

            // when
            final ExtractableResponse<Response> response = PATCH_DISPLAY_MEMBER_NAME_CHANGE(PHILIP_ACCESS_TOKEN, STATICS_TEAM_PLACE.getId(), requestBody);

            // then
            final List<TeamPlaceMemberResponse> teamMembers = GET_MEMBERS_REQUEST(PHILIP_ACCESS_TOKEN, STATICS_TEAM_PLACE.getId())
                    .body()
                    .as(TeamPlaceMembersResponse.class)
                    .members();

            final Optional<TeamPlaceMemberResponse> changedMyInfo = teamMembers.stream()
                    .filter(TeamPlaceMemberResponse::isMe)
                    .findAny();
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(changedMyInfo).isPresent();
                softly.assertThat(changedMyInfo.get().name()).isEqualTo(NEW_NAME);
            });
        }
    }
}
