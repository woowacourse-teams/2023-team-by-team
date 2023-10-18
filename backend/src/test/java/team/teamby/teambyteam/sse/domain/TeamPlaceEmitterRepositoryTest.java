package team.teamby.teambyteam.sse.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class TeamPlaceEmitterRepositoryTest {

    @Autowired
    private TeamPlaceEmitterRepository teamPlaceEmitterRepository;

    @Value("${sse.cache-schedule-period}")
    private Long schedulePeriod;

    @DisplayName("emitter 저장을 성공한다.")
    @Test
    void save() {
        //given
        final TeamPlaceEmitterId teamPlaceEmitterId = TeamPlaceEmitterId.of(1L, 1L);
        final SseEmitter sseEmitter = new SseEmitter(1000L * 60);

        //when
        final SseEmitter save = teamPlaceEmitterRepository.save(teamPlaceEmitterId, sseEmitter).getSingleEmitter();

        //then
        assertThat(save).isEqualTo(sseEmitter);
    }

    @DisplayName("팀플레이스 아이디로 저징된 캐시들을 찾는다.")
    @Test
    void findCache() {
        //given
        final TeamPlaceEventId teamPlaceEventId1 = TeamPlaceEventId.of(1L, "test");
        final TeamPlaceEventId teamPlaceEventId2 = TeamPlaceEventId.of(2L, "test");
        final String event1 = "test1";
        final String event2 = "test2";

        teamPlaceEmitterRepository.addEventCache(teamPlaceEventId1, event1);
        teamPlaceEmitterRepository.addEventCache(teamPlaceEventId2, event2);

        //when
        final Map<TeamPlaceEventId, Object> events = teamPlaceEmitterRepository.findAllEventCacheWithId(1L);

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(events).hasSize(1);
            softly.assertThat(events.get(teamPlaceEventId1)).isEqualTo(event1);
        });
    }

    @DisplayName("이벤트 캐시를 일정 시간마다 제거한다.")
    @Test
    void refreshCache() throws InterruptedException {
        //given
        final LocalDateTime pastLocalDateTime = LocalDateTime.now().minusMinutes(1);

        final TeamPlaceEventId teamPlaceEventId = Mockito.spy(TeamPlaceEventId.class);
        given(teamPlaceEventId.getTimeStamp())
                .willReturn(pastLocalDateTime);
        given(teamPlaceEventId.isPublishedTo(1L))
                .willReturn(true);

        final String event = "event";
        teamPlaceEmitterRepository.addEventCache(teamPlaceEventId, event);

        //when
        Thread.sleep(schedulePeriod);

        //then
        final Map<TeamPlaceEventId, Object> allEventCacheWithId = teamPlaceEmitterRepository.findAllEventCacheWithId(1L);
        assertThat(allEventCacheWithId).hasSize(0);
    }
}
