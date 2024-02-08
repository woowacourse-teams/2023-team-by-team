package team.teamby.teambyteam.sse.domain.emitter;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class TeamPlaceEmitterRepositoryTest {

    @Autowired
    private TeamPlaceEmitterRepository teamPlaceEmitterRepository;

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

}
