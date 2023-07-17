package team.teamby.teambyteam.schedule.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s " +
            "WHERE s.teamPlaceId = :teamPlaceId " +
            "AND s.span.startDateTime < :lastDateTime " +
            "AND s.span.endDateTime > :firstDateTime"
    )
    List<Schedule> findAllByTeamPlaceInPeriod(
            Long teamPlaceId,
            LocalDateTime firstDateTime,
            LocalDateTime lastDateTime
    );

}
