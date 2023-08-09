package team.teamby.teambyteam.token.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.token.application.dto.TokenResponse;
import team.teamby.teambyteam.token.domain.Token;
import team.teamby.teambyteam.token.domain.TokenRepository;
import team.teamby.teambyteam.token.exception.TokenException;

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
                .orElseThrow(TokenException.TokenNotFoundException::new);
        token.changeToken(generateRefreshToken);
        return TokenResponse.of(generateAccessToken, generateRefreshToken);
    }
}
