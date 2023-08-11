package team.teamby.teambyteam.auth.oauth.application;

import lombok.RequiredArgsConstructor;
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

import java.util.Base64;

@RequiredArgsConstructor
@Transactional
@Service
public class GoogleOAuthService {

    private static final int PAYLOAD_INDEX = 1;
    private static final int NAME_BEGIN_INDEX = 0;

    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleOAuthClient googleOAuthClient;
    private final MemberRepository memberRepository;

    public TokenResponse createToken(final String code) {
        final GoogleTokenResponse googleTokenResponse = googleOAuthClient.getGoogleAccessToken(code);
        final OAuthMember oAuthMember = createOAuthMember(googleTokenResponse.idToken());
        createMemberIfNotExist(oAuthMember);
        return new TokenResponse(jwtTokenProvider.generateAccessToken(oAuthMember.email()));
    }

    private OAuthMember createOAuthMember(final String googleIdToken) {
        final String email = extractElementFromToken(googleIdToken, "email");
        final String rawName = extractElementFromToken(googleIdToken, "name");
        final String picture = extractElementFromToken(googleIdToken, "picture");
        final String substringName = rawName.substring(NAME_BEGIN_INDEX, Name.MAX_LENGTH);

        return new OAuthMember(email, substringName, picture);
    }

    private void createMemberIfNotExist(final OAuthMember oAuthMember) {
        if (memberRepository.existsByEmail(new Email(oAuthMember.email()))) {
            return;
        }
        final Member member = new Member(oAuthMember.displayName(), oAuthMember.email(), oAuthMember.imageUrl());
        memberRepository.save(member);
    }

    private String extractElementFromToken(final String googleIdToken, final String key) {
        final String payLoad = googleIdToken.split("\\.")[PAYLOAD_INDEX];
        final String decodedPayLoad = new String(Base64.getDecoder().decode(payLoad));
        final JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
        return (String) jacksonJsonParser.parseMap(decodedPayLoad)
                .get(key);
    }
}
