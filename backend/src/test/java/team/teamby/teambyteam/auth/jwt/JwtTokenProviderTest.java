package team.teamby.teambyteam.auth.jwt;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import team.teamby.teambyteam.auth.exception.AuthenticationException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP_EMAIL;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.*;

@SpringBootTest
class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Nested
    @DisplayName("액세스 토큰 테스트")
    class AccessToken {

        @Test
        @DisplayName("엑세스 토큰 생성에 성공한다")
        void successGenerateAccessToken() {
            // given
            String email = PHILIP_EMAIL;

            // when
            String accessToken = jwtTokenProvider.generateAccessToken(email);

            // then
            assertThat(accessToken).isNotNull();
        }

        @Test
        @DisplayName("엑세스 토큰에서 이메일을 추출한다")
        void successExtractEmailFromAccessToken() {
            // given
            String email = PHILIP_EMAIL;
            String accessToken = jwtTokenProvider.generateAccessToken(email);

            // when
            String actualEmail = jwtTokenProvider.extractEmailFromAccessToken(accessToken);

            // then
            assertThat(actualEmail).isEqualTo(email);
        }

        @Test
        @DisplayName("액세스 토큰 추출 시 JWT 형식이 다른 토큰이면 예외가 발생한다.")
        void throwsWhenMalFormedToken() {
            // given
            String malFormedJwtToken = MALFORMED_JWT_TOKEN;

            // when & then
            assertThatThrownBy(() -> jwtTokenProvider.extractEmailFromAccessToken(malFormedJwtToken))
                    .isInstanceOf(AuthenticationException.FailAuthenticationException.class)
                    .hasMessage("인증이 실패했습니다.");
        }

        @Test
        @DisplayName("액세스 토큰 추출 시 Email 클레임이 없는 토큰이면 예외가 발생한다.")
        void throwsWhenMissingClaimToken() {
            // given
            String missingClaimToken = MISSING_CLAIM_ACCESS_TOKEN;

            // when & then
            assertThatThrownBy(() -> jwtTokenProvider.extractEmailFromAccessToken(missingClaimToken))
                    .isInstanceOf(AuthenticationException.FailAuthenticationException.class)
                    .hasMessage("인증이 실패했습니다.");
        }
    }

    @Nested
    @DisplayName("리프레시 토큰 테스트")
    class RefreshToken {

        @Test
        @DisplayName("리프레시 토큰 생성에 성공한다")
        void successGenerateRefreshToken() {
            // given
            String email = PHILIP_EMAIL;

            // when
            String refreshToken = jwtTokenProvider.generateRefreshToken(email);

            // then
            assertThat(refreshToken).isNotNull();
        }

        @Test
        @DisplayName("리프레시 토큰에서 이메일을 추출한다")
        void successExtractEmailFromRefreshToken() {
            // given
            String email = PHILIP_EMAIL;
            String refreshToken = jwtTokenProvider.generateRefreshToken(email);

            // when
            String actualEmail = jwtTokenProvider.extractEmailFromRefreshToken(refreshToken);

            // then
            assertThat(actualEmail).isEqualTo(email);
        }

        @Test
        @DisplayName("리프레시 토큰 추출 시 JWT 형식이 다른 토큰이면 예외가 발생한다.")
        void throwsWhenMalFormedToken() {
            // given
            String malFormedJwtToken = MALFORMED_JWT_TOKEN;

            // when & then
            assertThatThrownBy(() -> jwtTokenProvider.extractEmailFromRefreshToken(malFormedJwtToken))
                    .isInstanceOf(AuthenticationException.FailAuthenticationException.class)
                    .hasMessage("인증이 실패했습니다.");
        }

        @Test
        @DisplayName("리프레시 토큰 추출 시 Email 클레임이 없는 토큰이면 예외가 발생한다.")
        void throwsWhenMissingClaimToken() {
            // given
            String missingClaimToken = MISSING_CLAIM_REFRESH_TOKEN;

            // when & then
            assertThatThrownBy(() -> jwtTokenProvider.extractEmailFromRefreshToken(missingClaimToken))
                    .isInstanceOf(AuthenticationException.FailAuthenticationException.class)
                    .hasMessage("인증이 실패했습니다.");
        }
    }
}
