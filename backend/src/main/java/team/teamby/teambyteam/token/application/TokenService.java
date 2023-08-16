package team.teamby.teambyteam.token.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.token.application.dto.TokenResponse;
import team.teamby.teambyteam.token.domain.Token;
import team.teamby.teambyteam.token.domain.TokenRepository;
import team.teamby.teambyteam.token.exception.TokenException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final TokenRepository tokenRepository;

    public TokenResponse reissueToken(final String refreshToken) {
        final String email = jwtTokenProvider.extractEmailFromRefreshToken(refreshToken);
        final String generateAccessToken = jwtTokenProvider.generateAccessToken(email);
        final String generateRefreshToken = jwtTokenProvider.generateRefreshToken(email);
        final Token token = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new TokenException.TokenNotFoundException(email));

        token.changeToken(generateRefreshToken);

        log.info("인증 토큰 재발급 - 재발급 받은 사용자 이메일 : {}", email);
        return TokenResponse.of(generateAccessToken, generateRefreshToken);
    }
}
