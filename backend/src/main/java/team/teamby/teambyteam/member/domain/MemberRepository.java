package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import team.teamby.teambyteam.member.domain.vo.Email;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(@Param("email") Email email);
}
