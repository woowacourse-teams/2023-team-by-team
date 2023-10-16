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
import team.teamby.teambyteam.sse.TestEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterRepository;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

class SseSubscribeServiceTest extends ServiceTest {

    @Autowired
    private SseSubscribeService sseSubscribeService;

    @MockBean
    private TeamPlaceEmitterRepository teamPlaceEmitterRepository;

    @BeforeEach
    void setup() {
        final SseEmitter sseEmitter = Mockito.mock(SseEmitter.class);
        BDDMockito.given(teamPlaceEmitterRepository.save(any(), any()))
                .willReturn(sseEmitter);
    }

    @Test
    @DisplayName("SSE 연결에 성공 후 더미이벤트를 발행시킨다.")
    void successWithInitialDummyMessage() throws IOException {
        // given
        final Member member = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final MemberEmailDto email = new MemberEmailDto(member.getEmailValue());
        final Long teamPlaceId = 1L;

        // when
        final SseEmitter sseEmitter = sseSubscribeService.subscribe(teamPlaceId, email, null);

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
            softly.assertThat(eventOutputs[2]).isEqualTo("data:EventStream Connected. [memberId=%d]", teamPlaceId);
        });
    }

    @Test
    @DisplayName("SSE 연결 수 저장된 케시 이벤트들을 발행한다.")
    void successWithCachedEvent() throws IOException, InterruptedException {
        // given
        final Member member = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final MemberEmailDto email = new MemberEmailDto(member.getEmailValue());
        final Long teamPlaceId = 1L;
        final String eventName = "test";
        final String eventMessage = "message";
        final TestEvent cachedEvent = new TestEvent(teamPlaceId, eventName, eventMessage);

        final TeamPlaceEventId lastEventId = TeamPlaceEventId.of(teamPlaceId, eventName);
        Thread.sleep(100);
        final TeamPlaceEventId cachedEventId = TeamPlaceEventId.of(teamPlaceId, eventName);

        BDDMockito.given(teamPlaceEmitterRepository.findAllEventCacheWithId(teamPlaceId))
                .willReturn(Map.of(cachedEventId, cachedEvent.getEvent()));

        // when

        final SseEmitter sseEmitter = sseSubscribeService.subscribe(teamPlaceId, email, lastEventId.toString());

        // then
        // verify if the SSE is sent
        ArgumentCaptor<SseEmitter.SseEventBuilder> argumentCaptor = ArgumentCaptor.forClass(SseEmitter.SseEventBuilder.class);
        verify(sseEmitter, times(2)).send(argumentCaptor.capture());

        // verify the content of the SSE
        final List<SseEmitter.SseEventBuilder> allEvents = argumentCaptor.getAllValues();

        final Set<ResponseBodyEmitter.DataWithMediaType> dummyEventProperties = allEvents.get(0).build();
        final String dummySse = SsePropertyToString(dummyEventProperties);

        final Set<ResponseBodyEmitter.DataWithMediaType> cachedEventProperties = allEvents.get(1).build();
        final String cachedSse = SsePropertyToString(cachedEventProperties);

        final String[] dummyResult = dummySse.split("\n");
        final String[] cachedResult = cachedSse.split("\n");


        Arrays.stream(dummyResult).forEach(System.out::println);
        System.out.println();
        Arrays.stream(cachedResult).forEach(System.out::println);

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(allEvents).hasSize(2);
            softly.assertThat(dummyResult[0]).startsWith("id:" + teamPlaceId + "_connect_");
            softly.assertThat(dummyResult[1]).isEqualTo("event:connect");
            softly.assertThat(dummyResult[2]).isEqualTo("data:EventStream Connected. [memberId=%d]", teamPlaceId);
            softly.assertThat(cachedResult[0]).startsWith("id:" + teamPlaceId + "_" + eventName + "_");
            softly.assertThat(cachedResult[1]).isEqualTo("event:test");
            softly.assertThat(cachedResult[2]).isEqualTo("data:{\"id\":1,\"data\":\"message\"}");
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
