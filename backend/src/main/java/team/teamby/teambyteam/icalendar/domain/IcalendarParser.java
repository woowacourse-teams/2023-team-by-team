package team.teamby.teambyteam.icalendar.domain;

import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

public interface IcalendarParser {
    String X_WR_CALNAME = "X-WR-CALNAME";
    String X_WR_TIMEZONE = "X-WR-TIMEZONE";
    String X_WR_CALDESC = "X-WR-CALDESC";

    String parse(final TeamPlace teamPlace, final List<Schedule> schedules);
}
