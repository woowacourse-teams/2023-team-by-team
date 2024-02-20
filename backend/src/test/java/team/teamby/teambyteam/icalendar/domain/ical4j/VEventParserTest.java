package team.teamby.teambyteam.icalendar.domain.ical4j;

import net.fortuna.ical4j.model.component.VEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.domain.Schedule;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class VEventParserTest {

    private static final Long TEAM_PLACE_ID_2 = 2L;

    private VEventParser vEventParser;

    @BeforeEach
    void setUp() {
        this.vEventParser = new VEventParser(new ScheduleUidGenerator());
    }

    @Test
    @DisplayName("n시간 Schedule로 ical 이벤트 메타데이터 생성")
    void nHourScheduleParsing() {
        // given
        final Schedule schedule = Mockito.spy(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(TEAM_PLACE_ID_2));
        when(schedule.getId()).thenReturn(1L);

        // when
        final VEvent vEvent = vEventParser.parse(schedule);

        // then
        final List<String> parsedMetaDataLines = List.of(vEvent.toString().split("\\r\\n"));
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

    @Test
    @DisplayName("종일 일정 Schedule로 ical 이벤트 메타데이터 생성 - 1일")
    void allSingleDayScheduleParsing() {
        // given
        final Schedule schedule = Mockito.spy(ScheduleFixtures.MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(TEAM_PLACE_ID_2));
        when(schedule.getId()).thenReturn(1L);

        // when
        final VEvent vEvent = vEventParser.parse(schedule);

        // then
        final List<String> parsedMetaDataLines = List.of(vEvent.toString().split("\\r\\n"));
        final List<String> expects = List.of(
                "BEGIN:VEVENT",
                "DTSTART;VALUE=DATE:20230712",
                "DTEND;VALUE=DATE:20230713",
                "SUMMARY:2번 팀플 7월 12일 종일 일정",
                "UID:2-1",
                "END:VEVENT"
        );
        assertThat(parsedMetaDataLines).containsAll(expects);
    }

    @Test
    @DisplayName("종일 일정 Schedule로 ical 이벤트 메타데이터 생성 - n일")
    void allMultipleDayScheduleParsing() {
        // given
        final Schedule schedule = Mockito.spy(ScheduleFixtures.MONTH_6_AND_MONTH_7_SCHEDULE(TEAM_PLACE_ID_2));
        when(schedule.getId()).thenReturn(1L);

        // when
        final VEvent vEvent = vEventParser.parse(schedule);

        // then
        final List<String> parsedMetaDataLines = List.of(vEvent.toString().split("\\r\\n"));
        final List<String> expects = List.of(
                "BEGIN:VEVENT",
                "DTSTART;VALUE=DATE:20230601",
                "DTEND;VALUE=DATE:20230801",
                "SUMMARY:2번 팀플 6월~7월 일정",
                "UID:2-1",
                "END:VEVENT"
        );
        assertThat(parsedMetaDataLines).containsAll(expects);
    }
}
