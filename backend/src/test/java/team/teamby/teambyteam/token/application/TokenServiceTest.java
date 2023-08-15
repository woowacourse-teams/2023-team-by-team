package team.teamby.teambyteam.token.application;

import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.token.application.dto.TokenResponse;
import team.teamby.teambyteam.token.domain.Token;
import team.teamby.teambyteam.token.exception.TokenException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.*;

class TokenServiceTest extends ServiceTest {

    @Autowired
    private TokenService tokenService;

    @Test
    @DisplayName("받은 리프레시 토큰이 정상인 경우 액세스 토큰, 리프레시 토큰을 재발급한다.")
    void successReissueToken() {
        // given
        final Member philip = testFixtureBuilder.buildMember(PHILIP());
        final String refreshToken = CORRECT_REFRESH_TOKEN;
        final Token token = testFixtureBuilder.buildToken(TOKEN_ENTITY(philip, refreshToken));

        // when
        final TokenResponse tokenResponse = tokenService.reissueToken(refreshToken);

        // then
        assertSoftly(softly -> {
            softly.assertThat(tokenResponse.accessToken()).isNotNull();
            softly.assertThat(tokenResponse.refreshToken()).isNotNull();
            softly.assertThat(tokenResponse.refreshToken()).isNotEqualTo(CORRECT_REFRESH_TOKEN);
        });
    }

    @Test
    @DisplayName("받은 리프레시 토큰이 만료된 경우 예외가 발생한다.")
    void failReissueTokenByExpiredRefreshToken() {
        // given
        final Member philip = testFixtureBuilder.buildMember(PHILIP());
        final String expiredRefreshToken = EXPIRED_REFRESH_TOKEN;
        final Token token = testFixtureBuilder.buildToken(TOKEN_ENTITY(philip, expiredRefreshToken));

        // when & then
        assertThatThrownBy(() -> tokenService.reissueToken(expiredRefreshToken))
                .isInstanceOf(ExpiredJwtException.class)
                .hasMessage("EXPIRED_REFRESH_TOKEN");
    }

    @Test
    @DisplayName("받은 리프레시 토큰에 이메일 Claim이 없는 경우 예외가 발생한다.")
    void failReissueTokenByMissingClaimRefreshToken() {
        // given
        final Member philip = testFixtureBuilder.buildMember(PHILIP());
        final String missingClaimRefreshToken = MISSING_CLAIM_REFRESH_TOKEN;
        final Token token = testFixtureBuilder.buildToken(TOKEN_ENTITY(philip, missingClaimRefreshToken));

        // when & then
        assertThatThrownBy(() -> tokenService.reissueToken(missingClaimRefreshToken))
                .isInstanceOf(AuthenticationException.FailAuthenticationException.class)
                .hasMessage("인증이 실패했습니다.");
    }

    @Test
    @DisplayName("받은 리프레시 토큰이 잘못된 형식일 경우 예외가 발생한다.")
    void failReissueTokenByMalFormedRefreshToken() {
        // given
        final Member philip = testFixtureBuilder.buildMember(PHILIP());
        final String malformedJwtToken = MALFORMED_JWT_TOKEN;
        final Token token = testFixtureBuilder.buildToken(TOKEN_ENTITY(philip, malformedJwtToken));

        // when & then
        assertThatThrownBy(() -> tokenService.reissueToken(malformedJwtToken))
                .isInstanceOf(AuthenticationException.FailAuthenticationException.class)
                .hasMessage("인증이 실패했습니다.");
    }

    @Test
    @DisplayName("받은 리프레시 토큰이 DB에 없는 경우 예외가 발생한다.")
    void failReissueTokenNotExistRefreshToken() {
        // given
        final String refreshToken = CORRECT_REFRESH_TOKEN;

        // when & then
        assertThatThrownBy(() -> tokenService.reissueToken(refreshToken))
                .isInstanceOf(TokenException.TokenNotFoundException.class)
                .hasMessageContaining("토큰을 찾을 수 없습니다.");
    }
}
