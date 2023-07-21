package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import team.teamby.teambyteam.member.domain.vo.Email;

import java.util.List;

public interface MemberTeamPlaceRepository extends JpaRepository<MemberTeamPlace, Long> {

    List<MemberTeamPlace> findMemberTeamPlacesByMemberEmail(Email email);

    boolean existsByTeamPlaceId(Long id);
}
