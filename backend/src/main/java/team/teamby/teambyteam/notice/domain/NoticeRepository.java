package team.teamby.teambyteam.notice.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByTeamPlaceId(Long teamPlaceId);
}
