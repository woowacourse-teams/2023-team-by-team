package team.teamby.teambyteam.token.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByRefreshToken(final String refreshToken);
}
