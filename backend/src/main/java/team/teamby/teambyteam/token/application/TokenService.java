package team.teamby.teambyteam.token.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.auth.jwt.JwtAccessTokenManager;
import team.teamby.teambyteam.auth.jwt.JwtRefreshTokenManager;
import team.teamby.teambyteam.token.application.dto.TokenResponse;
import team.teamby.teambyteam.token.domain.Token;
import team.teamby.teambyteam.token.domain.TokenRepository;
import team.teamby.teambyteam.token.exception.TokenNotFoundException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TokenService {

    private final JwtAccessTokenManager jwtAccessTokenManager;
    private final JwtRefreshTokenManager jwtRefreshTokenManager;
    private final TokenRepository tokenRepository;

    public TokenResponse reissueToken(final String refreshTokenHeader) {
        final String email = jwtRefreshTokenManager.parseEmail(jwtRefreshTokenManager.parseToken(refreshTokenHeader));
        final String generateAccessToken = jwtAccessTokenManager.generateToken(email);
        final String generateRefreshToken = jwtRefreshTokenManager.generateToken(email);
        final Token token = tokenRepository.findByRefreshToken(jwtAccessTokenManager.parseToken(refreshTokenHeader))
                .orElseThrow(() -> new TokenNotFoundException(email));

        token.changeToken(generateRefreshToken);

        log.info("인증 토큰 재발급 - 재발급 받은 사용자 이메일 : {}", email);
        return TokenResponse.of(generateAccessToken, generateRefreshToken);
    }
}
