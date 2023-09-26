package team.teamby.teambyteam.token.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import team.teamby.teambyteam.member.domain.Member;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByRefreshToken(final String refreshToken);

    Optional<Token> findByMember(final Member member);

    @Query("DELETE from Token t where t.member = :member")
    @Modifying
    void deleteByMember(final Member member);
}
