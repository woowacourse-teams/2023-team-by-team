package team.teamby.teambyteam.sharedlink.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.SharedLinkAcceptanceFixtures.REGISTER_SHARED_LINK_REQUEST;

public final class SharedLinkAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("공유 링크 생성시")
    public class CreateSharedLinkTest {

        @Test
        @DisplayName("공유 링크를 해당 팀플레이스에 생성한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "/");

            // when
            final ExtractableResponse<Response> successRequest = REGISTER_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLinkCreateRequest);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(successRequest.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + ENGLISH_TEAM_PLACE.getId() + "/team-links/");
            });
        }

        @Test
        @DisplayName("공유 링크 제목이 빈칸이면 예외를 반환한다.")
        void failIfBlankTitle() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final String invalidTitle = "";
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest(invalidTitle, "/");

            // when
            final ExtractableResponse<Response> successRequest = REGISTER_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLinkCreateRequest);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
            });
        }

        @Test
        @DisplayName("공유 링크가 빈칸이면 예외를 반환한다.")
        void failIfBlankURL() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final String invalidUrl = "";
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", invalidUrl);


            // when
            final ExtractableResponse<Response> successRequest = REGISTER_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLinkCreateRequest);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자면 예외를 반환한다.")
        void failIfUnAuthorized() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "/");
            final String invalidToken = "aaaa.bbbb.cccc";

            // when
            final ExtractableResponse<Response> successRequest = REGISTER_SHARED_LINK_REQUEST(invalidToken, ENGLISH_TEAM_PLACE.getId(), sharedLinkCreateRequest);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }

        @Test
        @DisplayName("존재하지 않거나 참여하지 않은 팀플레이스면 예외를 반환한다.")
        void failIfNotParticipated() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final Long invalidTeamPlaceId = -1L;
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "/");

            // when
            final ExtractableResponse<Response> successRequest = REGISTER_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), invalidTeamPlaceId, sharedLinkCreateRequest);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }
    }
}
