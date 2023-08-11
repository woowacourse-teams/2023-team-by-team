package team.teamby.teambyteam.token.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.token.domain.Token;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.*;
import static team.teamby.teambyteam.common.fixtures.acceptance.TokenAcceptanceFixtures.REISSUE_TOKEN_REQUEST;

public class TokenAcceptanceTest extends AcceptanceTest {

    private static final String ACCESS_TOKEN_HEADER = HttpHeaders.AUTHORIZATION;
    private static final String REFRESH_TOKEN_HEADER = "Authorization-Refresh";

    @Test
    @DisplayName("리프레시 토큰으로 요청 시 액세스 토큰, 리프레시 토큰 재발급에 성공한다.")
    void successReissueToken() {
        // given
        final String refreshToken = CORRECT_REFRESH_TOKEN;
        final Member savedMember = testFixtureBuilder.buildMember(PHILIP());
        testFixtureBuilder.buildToken(new Token(savedMember, refreshToken));

        // when
        final ExtractableResponse<Response> response = REISSUE_TOKEN_REQUEST(refreshToken);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat(response.header(ACCESS_TOKEN_HEADER)).isNotNull();
            softly.assertThat(response.header(REFRESH_TOKEN_HEADER)).isNotNull();
            softly.assertThat(response.header(REFRESH_TOKEN_HEADER)).isNotEqualTo(refreshToken);
        });
    }

    @Test
    @DisplayName("만료된 리프레시 토큰으로 요청 시 토큰 발급에 실패한다.")
    void failReissueTokenWhenExpiredRefreshToken() {
        // given
        final String expiredRefreshToken = EXPIRED_REFRESH_TOKEN;
        final Member savedMember = testFixtureBuilder.buildMember(PHILIP());
        testFixtureBuilder.buildToken(new Token(savedMember, CORRECT_REFRESH_TOKEN));

        // when
        final ExtractableResponse<Response> response = REISSUE_TOKEN_REQUEST(expiredRefreshToken);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            softly.assertThat(response.body().asString()).isEqualTo("토큰이 만료되었습니다.");
            softly.assertThat(response.header(ACCESS_TOKEN_HEADER)).isNull();
            softly.assertThat(response.header(REFRESH_TOKEN_HEADER)).isNull();
        });
    }

    @Test
    @DisplayName("잘못된 형식의 리프레시 토큰으로 요청 시 토큰 발급에 실패한다.")
    void failReissueTokenWhenMalFormedRefreshToken() {
        // given
        final String malFormedRefreshToken = MALFORMED_JWT_TOKEN;
        final Member savedMember = testFixtureBuilder.buildMember(PHILIP());
        testFixtureBuilder.buildToken(new Token(savedMember, CORRECT_REFRESH_TOKEN));

        // when
        final ExtractableResponse<Response> response = REISSUE_TOKEN_REQUEST(malFormedRefreshToken);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            softly.assertThat(response.body().asString()).isEqualTo("인증이 실패했습니다.");
            softly.assertThat(response.header(ACCESS_TOKEN_HEADER)).isNull();
            softly.assertThat(response.header(REFRESH_TOKEN_HEADER)).isNull();
        });
    }

    @Test
    @DisplayName("Email 클레임이 누락된 리프레시 토큰으로 요청 시 토큰 발급에 실패한다.")
    void failReissueTokenWhenMissingClaimRefreshToken() {
        // given
        final String missingClaimRefreshToken = MISSING_CLAIM_REFRESH_TOKEN;
        final Member savedMember = testFixtureBuilder.buildMember(PHILIP());
        testFixtureBuilder.buildToken(new Token(savedMember, CORRECT_REFRESH_TOKEN));

        // when
        final ExtractableResponse<Response> response = REISSUE_TOKEN_REQUEST(missingClaimRefreshToken);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            softly.assertThat(response.body().asString()).isEqualTo("인증이 실패했습니다.");
            softly.assertThat(response.header(ACCESS_TOKEN_HEADER)).isNull();
            softly.assertThat(response.header(REFRESH_TOKEN_HEADER)).isNull();
        });
    }

    @Test
    @DisplayName("존재하지 않는 리프레시 토큰으로 요청 시 토큰 발급에 실패한다.")
    void failReissueTokenWhenNotExistRefreshToken() {
        // given
        final String refreshToken = CORRECT_REFRESH_TOKEN;

        // when
        final ExtractableResponse<Response> response = REISSUE_TOKEN_REQUEST(refreshToken);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
            softly.assertThat(response.body().asString()).isEqualTo("토큰을 찾을 수 없습니다.");
            softly.assertThat(response.header(ACCESS_TOKEN_HEADER)).isNull();
            softly.assertThat(response.header(REFRESH_TOKEN_HEADER)).isNull();
        });
    }
}
