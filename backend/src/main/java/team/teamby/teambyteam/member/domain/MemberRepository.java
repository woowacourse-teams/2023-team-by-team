package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import team.teamby.teambyteam.member.domain.vo.Email;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(Email email);

    Optional<Member> findByEmail(Email email);

    Optional<IdOnly> findIdByEmail(Email email);
}
