package team.teamby.teambyteam.token.docs;

import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.auth.jwt.JwtTokenExtractor;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.token.application.TokenService;
import team.teamby.teambyteam.token.application.dto.TokenResponse;
import team.teamby.teambyteam.token.domain.TokenRepository;
import team.teamby.teambyteam.token.exception.TokenNotFoundException;
import team.teamby.teambyteam.token.presentation.TokenController;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP_EMAIL;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.CORRECT_ORIGINAL_PHILIP_REFRESH_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.CORRECT_REFRESH_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.CORRECT_REISSUE_PHILIP_ACCESS_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.CORRECT_REISSUE_PHILIP_REFRESH_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.EXPIRED_REFRESH_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.MALFORMED_JWT_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.MISSING_CLAIM_REFRESH_TOKEN;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.TOKEN_ENTITY;

@WebMvcTest(value = TokenController.class)
public class TokenApiDocsTest extends ApiDocsTest {

    private static final String AUTHORIZATION_REFRESH_HEADER_KEY = "Authorization-Refresh";

    @MockBean
    private TokenService tokenService;

    @MockBean
    private JwtTokenExtractor jwtTokenExtractor;

    @MockBean
    private TokenRepository tokenRepository;

    @Nested
    @DisplayName("토큰 재발급 문서화")
    class ReissueToken {

        @Test
        @DisplayName("토큰 재발급 성공")
        void success() throws Exception {
            // given
            final String originalRefreshToken = CORRECT_ORIGINAL_PHILIP_REFRESH_TOKEN;
            given(jwtTokenExtractor.extractRefreshToken(any())).willReturn(originalRefreshToken);
            given(jwtTokenProvider.generateAccessToken(PHILIP_EMAIL)).willReturn(CORRECT_REISSUE_PHILIP_ACCESS_TOKEN);
            given(jwtTokenProvider.generateRefreshToken(PHILIP_EMAIL)).willReturn(CORRECT_REISSUE_PHILIP_REFRESH_TOKEN);
            given(tokenRepository.findByRefreshToken(originalRefreshToken)).willReturn(Optional.of(TOKEN_ENTITY(PHILIP(), originalRefreshToken)));

            final String generateAccessToken = jwtTokenProvider.generateAccessToken(PHILIP_EMAIL);
            final String generateRefreshToken = jwtTokenProvider.generateRefreshToken(PHILIP_EMAIL);
            final TokenResponse reissueTokenResponse = TokenResponse.of(generateAccessToken, generateRefreshToken);

            given(jwtTokenProvider.extractEmailFromRefreshToken(originalRefreshToken))
                    .willReturn(PHILIP_EMAIL);

            given(tokenService.reissueToken(originalRefreshToken))
                    .willReturn(reissueTokenResponse);

            // when & then
            mockMvc.perform(post("/api/token/reissue")
                            .header(AUTHORIZATION_REFRESH_HEADER_KEY, originalRefreshToken))
                    .andExpect(status().isOk())
                    .andExpect(header().string(AUTHORIZATION_HEADER_KEY, generateAccessToken))
                    .andExpect(header().string(AUTHORIZATION_REFRESH_HEADER_KEY, generateRefreshToken))
                    .andDo(print())
                    .andDo(document("token/reissue/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_REFRESH_HEADER_KEY).description("사용자의 기존 Refresh Token")
                                    ),
                                    responseHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("재발급된 Access Token"),
                                            headerWithName(AUTHORIZATION_REFRESH_HEADER_KEY).description("재발급된 Refresh Token")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("만료된 리프레시 토큰으로 요청 시 실패")
        void failExpiredRefreshToken() throws Exception {
            // given
            final String expiredRefreshToken = EXPIRED_REFRESH_TOKEN;
            given(jwtTokenExtractor.extractRefreshToken(any())).willReturn(expiredRefreshToken);
            willThrow(new ExpiredJwtException(null, null, "EXPIRED_REFRESH_TOKEN"))
                    .given(tokenService)
                    .reissueToken(expiredRefreshToken);


            // when & then
            mockMvc.perform(post("/api/token/reissue")
                            .header(AUTHORIZATION_REFRESH_HEADER_KEY, expiredRefreshToken))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("token/reissue/failExpiredRefreshToken",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("잘못된 형식의 리프레시 토큰으로 요청 시 실패")
        void failMalFormedRefreshToken() throws Exception {
            // given
            final String malFormedRefreshToken = MALFORMED_JWT_TOKEN;
            given(jwtTokenExtractor.extractRefreshToken(any())).willReturn(malFormedRefreshToken);
            willThrow(new AuthenticationException.FailAuthenticationException("잘못된 리프레시 토큰"))
                    .given(tokenService)
                    .reissueToken(malFormedRefreshToken);


            // when & then
            mockMvc.perform(post("/api/token/reissue")
                            .header(AUTHORIZATION_REFRESH_HEADER_KEY, malFormedRefreshToken))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("token/reissue/failMalFormedRefreshToken",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("이메일 클레임이 누락된 리프레시 토큰으로 요청 시 실패")
        void failMissingClaimRefreshToken() throws Exception {
            // given
            final String missingClaimRefreshToken = MISSING_CLAIM_REFRESH_TOKEN;
            given(jwtTokenExtractor.extractRefreshToken(any())).willReturn(missingClaimRefreshToken);
            willThrow(new AuthenticationException.FailAuthenticationException("JWT 리프레시 토큰 Payload 이메일 누락"))
                    .given(tokenService)
                    .reissueToken(missingClaimRefreshToken);


            // when & then
            mockMvc.perform(post("/api/token/reissue")
                            .header(AUTHORIZATION_REFRESH_HEADER_KEY, missingClaimRefreshToken))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("token/reissue/failMissingClaimRefreshToken",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("요청한 RefreshToken에 해당하는 토큰이 DB에 존재하지 않을 때 실패")
        void failNotExistTokenDB() throws Exception {
            // given
            final String refreshToken = CORRECT_REFRESH_TOKEN;
            given(jwtTokenExtractor.extractRefreshToken(any())).willReturn(refreshToken);
            willThrow(new TokenNotFoundException(PHILIP_EMAIL))
                    .given(tokenService)
                    .reissueToken(refreshToken);


            // when & then
            mockMvc.perform(post("/api/token/reissue")
                            .header(AUTHORIZATION_REFRESH_HEADER_KEY, refreshToken))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("token/reissue/failNotExistTokenDb",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }
}
