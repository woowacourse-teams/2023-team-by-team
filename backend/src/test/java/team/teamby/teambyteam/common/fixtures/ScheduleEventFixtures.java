package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleDeleteEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleUpdateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleUpdateEventDto;
import team.teamby.teambyteam.schedule.domain.Schedule;

public class ScheduleEventFixtures {

    public static ScheduleCreateEvent SCHEDULE_CREATE_EVENT(final Schedule schedule) {
        return new ScheduleCreateEvent(schedule.getId(), schedule.getTeamPlaceId(), schedule.getTitle(), schedule.getSpan());
    }

    public static ScheduleUpdateEvent SCHEDULE_UPDATE_EVENT(final Schedule schedule, final ScheduleUpdateRequest request) {
        return new ScheduleUpdateEvent(schedule.getId(), schedule.getTeamPlaceId(), schedule.getTitle(), schedule.getSpan(),
                ScheduleUpdateEventDto.of(request.title(), request.startDateTime(), request.endDateTime()));
    }

    public static ScheduleDeleteEvent SCHEDULE_DELETE_EVENT(final Schedule schedule) {
        return new ScheduleDeleteEvent(schedule.getId(), schedule.getTeamPlaceId(), schedule.getTitle(), schedule.getSpan());
    }
}
