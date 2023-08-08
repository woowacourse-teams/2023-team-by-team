package team.teamby.teambyteam.teamplace.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamPlaceInviteCodeRepository extends JpaRepository<TeamPlaceInviteCode, Long> {

    TeamPlaceInviteCode findByTeamPlaceId(final Long teamPlaceId);
}
