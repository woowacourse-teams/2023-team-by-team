package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import team.teamby.teambyteam.member.domain.vo.Email;

import java.util.List;

public interface MemberTeamPlaceRepository extends JpaRepository<MemberTeamPlace, Long> {

    List<MemberTeamPlace> findMemberTeamPlacesByMemberEmail(@Param("email") Email email);
    boolean existsByTeamPlaceId(Long id);
}
