package team.teamby.teambyteam.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberTeamPlaceRepository extends JpaRepository<MemberTeamPlace, Long> {

    Optional<MemberIdAndDisplayNameOnly> findByTeamPlaceIdAndMemberId(Long teamPlaceId, Long memberId);

    List<MemberIdAndDisplayNameOnly> findAllByTeamPlaceId(Long teamPlaceId);
}
