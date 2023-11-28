package team.teamby.teambyteam.feed.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    List<Feed> findByTeamPlaceId(Long teamPlaceId);

    List<Feed> findByTeamPlaceId(Long teamPlaceId, Pageable pageable);

    List<Feed> findByTeamPlaceIdAndIdLessThan(Long teamPlaceId, Long lastId, Pageable pageable);
}
