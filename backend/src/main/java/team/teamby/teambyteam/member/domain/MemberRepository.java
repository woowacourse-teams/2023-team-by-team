package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import team.teamby.teambyteam.member.domain.vo.Email;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(Email email);
}
