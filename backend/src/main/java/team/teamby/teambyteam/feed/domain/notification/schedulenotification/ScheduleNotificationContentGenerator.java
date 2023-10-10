package team.teamby.teambyteam.feed.domain.notification.schedulenotification;

import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ScheduleNotificationContentGenerator {

    private static final String NOTIFICATION_LOCAL_DATE_TIME_FORMAT = "yyyy년 M월 d일 HH시 mm분";

    protected static Content generateScheduleCreateContent(final ScheduleEvent scheduleEvent) {
        final String title = scheduleEvent.getTitle().getValue();
        final LocalDateTime startDateTime = scheduleEvent.getSpan().getStartDateTime();
        final LocalDateTime endDateTime = scheduleEvent.getSpan().getEndDateTime();

        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(NOTIFICATION_LOCAL_DATE_TIME_FORMAT);

        final String content = String.format("'%s' 일정이 등록되었습니다.%n%s ~ %s",
                title, startDateTime.format(formatter), endDateTime.format(formatter));

        return new Content(content);
    }

    protected static Content generateScheduleUpdateContent(final ScheduleEvent scheduleEvent) {
        final String previousTitle = scheduleEvent.getTitle().getValue();

        final LocalDateTime previousStartDateTime = scheduleEvent.getSpan().getStartDateTime();
        final LocalDateTime previousEndDateTime = scheduleEvent.getSpan().getEndDateTime();

        final String updatedTitle = scheduleEvent.getUpdatedScheduleInfo().getUpdatedTitle().getValue();
        final LocalDateTime updatedStartDateTime = scheduleEvent.getUpdatedScheduleInfo().getUpdatedSpan().getStartDateTime();
        final LocalDateTime updatedEndDateTime = scheduleEvent.getUpdatedScheduleInfo().getUpdatedSpan().getEndDateTime();

        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(NOTIFICATION_LOCAL_DATE_TIME_FORMAT);

        final String content = String.format("'%s' 일정이 수정되었습니다.%n제목 변경 : %s > %s%n기간 변경 : %s ~ %s > %s ~ %s",
                previousTitle, previousTitle, updatedTitle,
                previousStartDateTime.format(formatter), previousEndDateTime.format(formatter),
                updatedStartDateTime.format(formatter), updatedEndDateTime.format(formatter));

        return new Content(content);
    }

    protected static Content generateScheduleDeleteContent(final ScheduleEvent scheduleEvent) {
        final String title = scheduleEvent.getTitle().getValue();

        String content = String.format("'%s' 일정이 삭제되었습니다.", title);

        return new Content(content);
    }
}
