package team.teamby.teambyteam.schedule.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    /**
     * Find All TeamPlace schedules in range
     *
     * @param teamPlaceId   teamPlaceId for the schedule
     * @param firstDateTime first-date-time of the period (Inclusive)
     * @param lastDateTime  last=date-time of the period (Exclusive)
     * @return List of the Schedules. If there is no Schedule, it will return the List with size 0.
     */
    @Query("SELECT s FROM Schedule s " +
            "WHERE s.teamPlaceId = :teamPlaceId " +
            "AND s.span.startDateTime < :lastDateTime " +
            "AND s.span.endDateTime >= :firstDateTime " +
            "ORDER BY s.span.startDateTime ASC"
    )
    List<Schedule> findAllByTeamPlaceIdAndPeriod(
            Long teamPlaceId,
            LocalDateTime firstDateTime,
            LocalDateTime lastDateTime
    );

    /**
     * Find All schedules in range
     *
     * @param teamPlaceIds  teamPlaceId for the schedule
     * @param firstDateTime first-date-time of the period (Inclusive)
     * @param lastDateTime  last=date-time of the period (Exclusive)
     * @return List of the Schedules. If there is no Schedule, it will return the List with size 0.
     */
    @Query("SELECT s FROM Schedule s " +
            "WHERE s.teamPlaceId IN :teamPlaceIds " +
            "AND s.span.startDateTime < :lastDateTime " +
            "AND s.span.endDateTime >= :firstDateTime " +
            "ORDER BY s.span.startDateTime ASC"
    )
    List<Schedule> findAllByTeamPlaceIdAndPeriod(
            List<Long> teamPlaceIds,
            LocalDateTime firstDateTime,
            LocalDateTime lastDateTime
    );

    List<Schedule> findAllByTeamPlaceId(Long teamPlaceId);
}
