package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberTeamPlaceRepository extends JpaRepository<MemberTeamPlace, Long> {

    Optional<MemberTeamPlace> findByTeamPlaceIdAndMemberId(Long teamPlaceId, Long memberId);

    List<MemberTeamPlace> findAllByMemberId(Long memberId);
}
