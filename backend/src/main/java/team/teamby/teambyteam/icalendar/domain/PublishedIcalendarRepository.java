package team.teamby.teambyteam.icalendar.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PublishedIcalendarRepository extends JpaRepository<PublishedIcalendar, Long> {

    boolean existsByTeamPlaceId(Long teamPlaceId);

    Optional<PublishedIcalendar> findByTeamPlaceId(Long teamPlaceId);

    List<PublishedIcalendar> findAllByTeamPlaceIds(List<Long> teamPlaceIds);
}
