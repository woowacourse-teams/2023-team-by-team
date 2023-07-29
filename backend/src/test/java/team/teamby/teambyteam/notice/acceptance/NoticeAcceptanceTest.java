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
    }
}
