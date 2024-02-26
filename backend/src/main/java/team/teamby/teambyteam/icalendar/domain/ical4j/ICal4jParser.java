package team.teamby.teambyteam.icalendar.domain.ical4j;

import lombok.extern.slf4j.Slf4j;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.PropertyList;
import net.fortuna.ical4j.model.component.Standard;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.property.DtStart;
import net.fortuna.ical4j.model.property.TzId;
import net.fortuna.ical4j.model.property.TzName;
import net.fortuna.ical4j.model.property.TzOffsetFrom;
import net.fortuna.ical4j.model.property.TzOffsetTo;
import net.fortuna.ical4j.model.property.XProperty;
import net.fortuna.ical4j.model.property.immutable.ImmutableMethod;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.icalendar.domain.IcalendarParser;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

@Slf4j
@Component
public class ICal4jParser implements IcalendarParser {

    private static final String ASIA_SEOUL = "Asia/Seoul";
    private static final String CALDESC_FORMAT = "팀바팀 - %s 팀프로젝트 일정 캘린더입니다.";
    private static final String TBT_CALENDAR_PROD_ID = "-//TeamByTeam//TeamPlace Calendar//EN";
    private static final String KST = "KST";
    private static final String STANDARD_DT_START = "19700101T000000";
    private static final String SEOUL_TZ_OFFSET = "+0900";

    private final VEventParser vEventParser = new VEventParser(new ScheduleUidGenerator());

    @Override
    public String parse(final TeamPlace teamPlace, final List<Schedule> schedules) {

        final Calendar calendar = generateCalendar(teamPlace);

        final List<VEvent> vEvents = schedules.stream()
                .map(vEventParser::parse)
                .toList();

        for (VEvent vEvent : vEvents) {
            calendar.add(vEvent);
        }
        return calendar.toString();
    }

    private Calendar generateCalendar(final TeamPlace teamPlace) {
        final VTimeZone vTimeZone = getSeoulVTimeZone();

        final String teamPlaceName = teamPlace.getNameValue();
        return new Calendar()
                .withProdId(TBT_CALENDAR_PROD_ID)
                .withDefaults()
                .withProperty(ImmutableMethod.PUBLISH)
                .withProperty(new XProperty(X_WR_CALNAME, teamPlaceName))
                .withProperty(new XProperty(X_WR_TIMEZONE, ASIA_SEOUL))
                .withProperty(new XProperty(X_WR_CALDESC, String.format(CALDESC_FORMAT, teamPlaceName)))
                .withComponent(vTimeZone)
                .getFluentTarget();
    }

    private static VTimeZone getSeoulVTimeZone() {
        final PropertyList timezoneStandardProperties = (PropertyList) new PropertyList()
                .add(new TzOffsetFrom(SEOUL_TZ_OFFSET))
                .add(new TzOffsetTo(SEOUL_TZ_OFFSET))
                .add(new TzName(KST))
                .add(new DtStart(STANDARD_DT_START));

        final PropertyList properties = new PropertyList(List.of(
                new TzId(ASIA_SEOUL)
        ));

        final Standard timezoneStandard = new Standard(timezoneStandardProperties);
        final VTimeZone vTimeZone = new VTimeZone(properties);
        vTimeZone.add(timezoneStandard);
        return vTimeZone;
    }

}
