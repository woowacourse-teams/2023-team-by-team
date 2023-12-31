package team.teamby.teambyteam.schedule.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Schedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Long teamPlaceId;

    @Embedded
    private Title title;

    @Embedded
    private Span span;

    public Schedule(final Long teamPlaceId, final Title title, final Span span) {
        this.teamPlaceId = teamPlaceId;
        this.title = title;
        this.span = span;
    }

    public boolean isScheduleOfTeam(final Long teamPlaceId) {
        return Objects.equals(teamPlaceId, this.teamPlaceId);
    }

    public void change(final String titleToUpdate,
                       final LocalDateTime startDateTimeToUpdate,
                       final LocalDateTime endDateTimeToUpdate) {
        this.title = title.change(titleToUpdate);
        this.span = span.change(startDateTimeToUpdate, endDateTimeToUpdate);
    }

    public LocalDateTime getStartDateTime() {
        return span.getStartDateTime();
    }

    public LocalDateTime getEndDateTime() {
        return span.getEndDateTime();
    }

    public boolean isAllDay() {
        return span.isAllDay();
    }
}
