package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.vo.Content;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ScheduleNotification extends Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Long scheduleId;

    @Override
    public FeedType getType() {
        return FeedType.SCHEDULE_NOTIFICATION;
    }

    @Override
    public Long getAuthorId() {
        return getScheduleId();
    }

    public ScheduleNotification(final Long teamPlaceId, final Content content, final Long scheduleId) {
        super(teamPlaceId, content);
        this.scheduleId = scheduleId;
    }
}
