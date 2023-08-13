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
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinksResponse;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.SEONGHA;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.SharedLinkAcceptanceFixtures.DELETE_SHARED_LINK_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.SharedLinkAcceptanceFixtures.GET_SHARED_LINK_REQUEST;
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

    @Nested
    @DisplayName("공유 링크 조회시")
    public class GetSharedLinkTest {

        @Test
        @DisplayName("지정 팀플레이스의 공유 링크를 조회한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "/");
            REGISTER_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLinkCreateRequest);

            // when
            final ExtractableResponse<Response> successRequest = GET_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId());

            // then
            final SharedLinksResponse sharedLinksResponse = successRequest.as(SharedLinksResponse.class);
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(sharedLinksResponse.teamLinks().size()).isEqualTo(1);
                softly.assertThat(sharedLinksResponse.teamLinks().get(0).title()).isEqualTo("title");
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자면 에러를 반환한다.")
        void failIfUnAuthorized() {
            // given
            final String invalidToken = "aaaa.bbbb.cccc";
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

            // when
            final ExtractableResponse<Response> successRequest = GET_SHARED_LINK_REQUEST(invalidToken, ENGLISH_TEAM_PLACE.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }

        @Test
        @DisplayName("존재하지 않거나 참여하지 않은 팀플레이스면 에러를 반환한다.")
        void failIfNotParticipated() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

            // when
            final ExtractableResponse<Response> successRequest = GET_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }
    }

    @Nested
    @DisplayName("공유 링크 삭제시")
    public class DeleteSharedLinkTest {

        @Test
        @DisplayName("지정 공유 링크를 삭제한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(new SharedLink(ENGLISH_TEAM_PLACE.getId(), PHILIP.getId(), new Title("title"), new SharedURL("/")));

            // when
            final ExtractableResponse<Response> successRequest = DELETE_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLink.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
            });
        }

        @Test
        @DisplayName("존재하지 않는 공유링크면 예외를 반환한다.")
        void failIfNotFound() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final Long invalidId = -1L;

            // when
            final ExtractableResponse<Response> successRequest = DELETE_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), invalidId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
            });
        }

        @Test
        @DisplayName("동일한 팀플레이스의 다른 멤버가 요청 해도 삭제한다.")
        void failIfNotCreatedMember() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final Member SEONGHA = testFixtureBuilder.buildMember(SEONGHA());
            testFixtureBuilder.buildMemberTeamPlace(SEONGHA, ENGLISH_TEAM_PLACE);
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(new SharedLink(ENGLISH_TEAM_PLACE.getId(), PHILIP.getId(), new Title("title"), new SharedURL("/")));

            // when
            final ExtractableResponse<Response> successRequest = DELETE_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(SEONGHA.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLink.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
            });
        }

        @Test
        @DisplayName("인증되지 않은 사용자면 예외를 반환한다.")
        void failIfUnAuthorized() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(new SharedLink(ENGLISH_TEAM_PLACE.getId(), PHILIP.getId(), new Title("title"), new SharedURL("/")));
            final String invalidToken = "aaaa.bbbb.cccc";

            // when
            final ExtractableResponse<Response> successRequest = DELETE_SHARED_LINK_REQUEST(invalidToken, ENGLISH_TEAM_PLACE.getId(), sharedLink.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            });
        }

        @Test
        @DisplayName("없거나 참여하지 않은 팀플레이스면 예외를 반환한다.")
        void failIfNotParticipated() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(new SharedLink(ENGLISH_TEAM_PLACE.getId(), PHILIP.getId(), new Title("title"), new SharedURL("/")));
            final Member SEONGHA = testFixtureBuilder.buildMember(SEONGHA());

            // when
            final ExtractableResponse<Response> successRequest = DELETE_SHARED_LINK_REQUEST(jwtTokenProvider.generateAccessToken(SEONGHA.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), sharedLink.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
            });
        }
    }
}
