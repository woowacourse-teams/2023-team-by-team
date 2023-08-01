package team.teamby.teambyteam.feed.domain.notification;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;

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

    protected ScheduleNotification(final Long teamPlaceId, final Content content, final Long scheduleId) {
        super(teamPlaceId, content);
        this.scheduleId = scheduleId;
    }

    public static ScheduleNotification from(final ScheduleEvent scheduleEvent) {
        return ScheduleNotificationFactory.from(scheduleEvent);
    }
}