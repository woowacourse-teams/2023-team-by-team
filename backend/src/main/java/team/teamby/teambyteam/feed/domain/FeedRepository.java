package team.teamby.teambyteam.feed.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    List<Feed> findByTeamPlaceId(Long teamPlaceId);
}
