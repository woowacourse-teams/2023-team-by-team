package team.teamby.teambyteam.token.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TokenFixtures.CORRECT_REFRESH_TOKEN;

class TokenRepositoryTest extends RepositoryTest {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("리프레시 토큰으로 토큰을 조회한다.")
    void findByRefreshToken() {
        // given
        final Member philip = memberRepository.save(PHILIP());
        final Token savedToken = tokenRepository.save(new Token(philip, CORRECT_REFRESH_TOKEN));

        // when
        final Token findToken = tokenRepository.findByRefreshToken(CORRECT_REFRESH_TOKEN).get();

        // then
        assertThat(findToken).usingRecursiveComparison()
                .isEqualTo(savedToken);
    }
}
