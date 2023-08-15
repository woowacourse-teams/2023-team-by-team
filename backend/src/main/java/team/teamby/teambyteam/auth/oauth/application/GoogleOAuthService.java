package team.teamby.teambyteam.auth.oauth.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.auth.oauth.application.dto.GoogleTokenResponse;
import team.teamby.teambyteam.auth.oauth.application.dto.OAuthMember;
import team.teamby.teambyteam.auth.oauth.application.dto.TokenResponse;
import team.teamby.teambyteam.auth.oauth.client.GoogleOAuthClient;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.domain.vo.Name;
import team.teamby.teambyteam.token.domain.Token;
import team.teamby.teambyteam.token.domain.TokenRepository;

import java.util.Base64;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class GoogleOAuthService {

    private static final int PAYLOAD_INDEX = 1;
    private static final int NAME_BEGIN_INDEX = 0;

    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleOAuthClient googleOAuthClient;
    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;

    public TokenResponse createToken(final String code) {
        final GoogleTokenResponse googleTokenResponse = googleOAuthClient.getGoogleAccessToken(code);
        final OAuthMember oAuthMember = createOAuthMember(googleTokenResponse.idToken());
        final Member member = createMemberIfNotExist(oAuthMember);

        final String accessToken = jwtTokenProvider.generateAccessToken(oAuthMember.email());
        final String refreshToken = jwtTokenProvider.generateRefreshToken(oAuthMember.email());

        saveOrUpdateRefreshToken(member, refreshToken);

        log.info("토큰 생성 - 사용자 이메일 : {}", oAuthMember.email());
        return new TokenResponse(accessToken, refreshToken);
    }

    private void saveOrUpdateRefreshToken(Member member, String refreshToken) {
        tokenRepository.findByMember(member)
                .ifPresentOrElse(
                        token -> token.changeToken(refreshToken),
                        () -> tokenRepository.save(new Token(member, refreshToken))
                );
    }

    private OAuthMember createOAuthMember(final String googleIdToken) {
        final String email = extractElementFromToken(googleIdToken, "email");
        final String rawName = extractElementFromToken(googleIdToken, "name");
        final String picture = extractElementFromToken(googleIdToken, "picture");

        if (rawName.length() > Name.MAX_LENGTH) {
            final String substringName = rawName.substring(NAME_BEGIN_INDEX, Name.MAX_LENGTH);
            return new OAuthMember(email, substringName, picture);
        }
        return new OAuthMember(email, rawName, picture);
    }

    private Member createMemberIfNotExist(final OAuthMember oAuthMember) {
        Optional<Member> optionalMember = memberRepository.findByEmail(new Email(oAuthMember.email()));
        if (optionalMember.isPresent()) {
            return optionalMember.get();
        }
        final Member member = new Member(oAuthMember.displayName(), oAuthMember.email(), oAuthMember.imageUrl());
        return memberRepository.save(member);
    }

    private String extractElementFromToken(final String googleIdToken, final String key) {
        final String payLoad = googleIdToken.split("\\.")[PAYLOAD_INDEX];
        final String decodedPayLoad = new String(Base64.getDecoder().decode(payLoad));
        final JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
        return (String) jacksonJsonParser.parseMap(decodedPayLoad)
                .get(key);
    }
}
