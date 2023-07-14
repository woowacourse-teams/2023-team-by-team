package team.teamby.teambyteam.schedule.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Schedule {

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
}
