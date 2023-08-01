package team.teamby.teambyteam.feed.domain.notification;

import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.schedule.application.event.EventType;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;

public class ScheduleNotificationFactory {

    protected static ScheduleNotification from(ScheduleEvent scheduleEvent) {
        EventType eventType = scheduleEvent.getEventType();

        if (eventType.equals(EventType.CREATE)) {
            return generateScheduleNotificationCreateEvent(scheduleEvent);
        }
        if (eventType.equals(EventType.UPDATE)) {
            return generateScheduleNotificationUpdateEvent(scheduleEvent);
        }
        return generateScheduleNotificationDeleteEvent(scheduleEvent);
    }

    private static ScheduleNotification generateScheduleNotificationCreateEvent(final ScheduleEvent scheduleEvent) {
        final Long scheduleId = scheduleEvent.getScheduleId();
        final Long teamPlaceId = scheduleEvent.getTeamPlaceId();
        final Content content = NotificationContentGenerator.generateScheduleCreateContent(scheduleEvent);

        return new ScheduleNotification(teamPlaceId, content, scheduleId);
    }

    private static ScheduleNotification generateScheduleNotificationUpdateEvent(final ScheduleEvent scheduleEvent) {
        final Long scheduleId = scheduleEvent.getScheduleId();
        final Long teamPlaceId = scheduleEvent.getTeamPlaceId();
        final Content content = NotificationContentGenerator.generateScheduleUpdateContent(scheduleEvent);

        return new ScheduleNotification(teamPlaceId, content, scheduleId);
    }


    private static ScheduleNotification generateScheduleNotificationDeleteEvent(final ScheduleEvent scheduleEvent) {
        final Long scheduleId = scheduleEvent.getScheduleId();
        final Long teamPlaceId = scheduleEvent.getTeamPlaceId();
        final Content content = NotificationContentGenerator.generateScheduleDeleteContent(scheduleEvent);

        return new ScheduleNotification(teamPlaceId, content, scheduleId);
    }
}
