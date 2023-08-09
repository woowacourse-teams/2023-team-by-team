package team.teamby.teambyteam.teamplace.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamPlaceInviteCodeRepository extends JpaRepository<TeamPlaceInviteCode, Long> {

    Optional<TeamPlaceInviteCode> findByTeamPlaceId(final Long teamPlaceId);

    boolean existsByTeamPlaceId(final Long teamPlaceId);
}
