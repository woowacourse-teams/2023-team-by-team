package team.teamby.teambyteam.sse.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.sse.domain.SseEmitters;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterId;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterRepository;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

class SseSubscribeServiceTest extends ServiceTest {

    @Autowired
    private SseSubscribeService sseSubscribeService;

    @MockBean
    private TeamPlaceEmitterRepository teamPlaceEmitterRepository;

    @BeforeEach
    void setup() {
        final SseEmitter sseEmitter = Mockito.mock(SseEmitter.class);
        final TeamPlaceEmitterId teamPlaceEventId = Mockito.mock(TeamPlaceEmitterId.class);
        BDDMockito.given(teamPlaceEmitterRepository.save(any(), any()))
                .willReturn(new SseEmitters(Map.of(teamPlaceEventId, sseEmitter)));
    }

    @Test
    @DisplayName("SSE 연결에 성공 후 더미이벤트를 발행시킨다.")
    void successWithInitialDummyMessage() throws IOException, InterruptedException {
        // given
        final Member member = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final MemberEmailDto email = new MemberEmailDto(member.getEmailValue());
        final Long teamPlaceId = 1L;

        // when
        final SseEmitter sseEmitter = sseSubscribeService.subscribe(teamPlaceId, email, null);

        Thread.sleep(1000);

        // then
        // verify if the SSE is sent
        ArgumentCaptor<SseEmitter.SseEventBuilder> argumentCaptor = ArgumentCaptor.forClass(SseEmitter.SseEventBuilder.class);
        verify(sseEmitter).send(argumentCaptor.capture());

        // verify the content of the SSE
        final Set<ResponseBodyEmitter.DataWithMediaType> properties = argumentCaptor.getValue().build();
        final String publishedSse = SsePropertyToString(properties);

        final String[] eventOutputs = publishedSse.split("\n");

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(eventOutputs[0]).startsWith("id:" + teamPlaceId + "_connect_");
            softly.assertThat(eventOutputs[1]).isEqualTo("event:connect");
            softly.assertThat(eventOutputs[2]).isEqualTo("data:{\"teamPlaceId\":%d,\"memberId\":%d}", teamPlaceId, member.getId());
        });
    }

    private String SsePropertyToString(final Set<ResponseBodyEmitter.DataWithMediaType> dummyEventProperties) {
        final String dummySse = dummyEventProperties.stream()
                .map(ResponseBodyEmitter.DataWithMediaType::getData)
                .map(Object::toString)
                .collect(Collectors.joining());
        return dummySse;
    }
}
