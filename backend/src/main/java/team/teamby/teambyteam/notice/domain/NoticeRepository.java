package team.teamby.teambyteam.notice.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findAllByTeamPlaceId(Long teamPlaceId);

    @Query("SELECT n FROM Notice n " +
            "WHERE n.teamPlaceId = :teamPlaceId " +
            "ORDER BY n.id DESC " +
            "LIMIT 1"
    )
    Optional<Notice> findMostRecentByTeamPlaceId(Long teamPlaceId);

    @Query("SELECT n.teamPlaceId FROM Notice n WHERE n.id = :id")
    Optional<Long> findTeamPlaceIdByNoticeId(Long id);
}
