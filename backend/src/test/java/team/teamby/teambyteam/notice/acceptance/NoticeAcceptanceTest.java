package team.teamby.teambyteam.notice.acceptance;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberTeamPlaceFixtures.PHILIP_ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

public class NoticeAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ObjectMapper objectMapper;


    @Nested
    @DisplayName("공지 등록 시")
    class RegisterNotice {

        @Test
        @DisplayName("공지 등록에 성공한다")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final NoticeRegisterRequest request = new NoticeRegisterRequest("테스트 공지");
            final String token = jwtTokenProvider.generateToken(PHILIP_ENGLISH_TEAM_PLACE.getMember().getEmail().getValue());

            // when
            final ExtractableResponse<Response> successRequest = RestAssured.given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .body(request)
                    .post("/api/team-place/{teamPlaceId}/feed/notice", ENGLISH_TEAM_PLACE.getId())
                    .then().log().all()
                    .extract();

            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(successRequest.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + ENGLISH_TEAM_PLACE.getId() + "/feed/threads/notice/");
            });
        }
    }
}
