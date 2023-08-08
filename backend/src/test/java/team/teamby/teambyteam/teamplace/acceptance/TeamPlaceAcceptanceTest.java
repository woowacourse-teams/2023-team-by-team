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
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;

import static team.teamby.teambyteam.common.fixtures.acceptance.MemberAcceptanceFixture.GET_PARTICIPATED_TEAM_PLACES;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamPlaceAcceptanceFixture.CREATE_TEAM_PLACE;

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
    }
}
