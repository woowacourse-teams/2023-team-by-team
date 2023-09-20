package team.teamby.teambyteam.icalendar.domain.ical4j;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.icalendar.domain.IcalendarParser;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class ICal4jParserTest {

    private final IcalendarParser parser = new ICal4jParser();

    @Test
    @DisplayName("팀플레이스 정보로 ical 캘린더의 메타데이터 생성")
    void makeCalendarMetaData() {
        // given
        final TeamPlace teamPlace = Mockito.spy(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
        when(teamPlace.getId()).thenReturn(2L);

        final List<Schedule> schedules = Collections.emptyList();

        // when
        final String parsedMetaData = parser.parse(teamPlace, schedules);

        // then
        final List<String> parsedMetaDataLines = List.of(parsedMetaData.split("\\r\\n"));
        final List<String> expectedMetaData = List.of(
                "BEGIN:VCALENDAR",
                "PRODID:-//TeamByTeam//TeamPlace Calendar//EN",
                "CALSCALE:GREGORIAN",
                "VERSION:2.0",
                "METHOD:PUBLISH",
                "X-WR-CALNAME:영어 팀플",
                "X-WR-TIMEZONE:Asia/Seoul",
                "X-WR-CALDESC:팀바팀 - 영어 팀플 팀프로젝트 일정 캘린더입니다.",
                "BEGIN:VTIMEZONE",
                "TZID:Asia/Seoul",
                "BEGIN:STANDARD",
                "TZOFFSETFROM:+0900",
                "TZOFFSETTO:+0900",
                "TZNAME:KST",
                "DTSTART:19700101T000000",
                "END:STANDARD",
                "END:VTIMEZONE",
                "END:VCALENDAR"
        );

        assertThat(parsedMetaDataLines).containsExactlyInAnyOrderElementsOf(expectedMetaData);
    }

    @Test
    @DisplayName("n시간 Schedule로 ical 이벤트 메타데이터 생성")
    void nHourScheduleParsing() {
        // given
        final TeamPlace teamPlace = Mockito.spy(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
        when(teamPlace.getId()).thenReturn(2L);

        final Schedule schedule = Mockito.spy(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(teamPlace.getId()));
        when(schedule.getId()).thenReturn(1L);

        final List<Schedule> schedules = List.of(schedule);

        // when
        final String parsedMetaData = parser.parse(teamPlace, schedules);

        // then
        final List<String> parsedMetaDataLines = List.of(parsedMetaData.split("\\r\\n"));
        final List<String> expects = List.of(
                "BEGIN:VEVENT",
                "DTSTART;TZID=Asia/Seoul:20230712T110000",
                "DTEND;TZID=Asia/Seoul:20230712T190000",
                "SUMMARY:2번 팀플 7월 12일 N시간 일정",
                "UID:2-1",
                "END:VEVENT"
        );
        assertThat(parsedMetaDataLines).containsAll(expects);
    }
}
