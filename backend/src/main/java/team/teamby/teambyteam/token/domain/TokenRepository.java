package team.teamby.teambyteam.token.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import team.teamby.teambyteam.member.domain.Member;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByRefreshToken(final String refreshToken);

    Optional<Token> findByMember(final Member member);

    boolean existsByMember(final Member member);
}
