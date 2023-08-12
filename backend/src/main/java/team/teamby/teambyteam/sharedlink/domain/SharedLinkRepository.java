package team.teamby.teambyteam.sharedlink.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SharedLinkRepository extends JpaRepository<SharedLink, Long> {

    List<SharedLink> findByTeamPlaceId(final Long teamPlaceId);
}
