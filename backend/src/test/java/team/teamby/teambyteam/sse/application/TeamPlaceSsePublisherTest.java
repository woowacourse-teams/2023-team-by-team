package team.teamby.teambyteam.sse.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.task.SyncTaskExecutor;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.sse.TestSseEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.converter.TeamPlaceSseConverter;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterRepository;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

import static org.mockito.Mockito.verify;

@SpringBootTest
class TeamPlaceSsePublisherTest {

    @Autowired
    private TeamPlaceSsePublisher teamPlaceSsePublisher;

    @Autowired
    private TeamPlaceEmitterRepository teamPlaceEmitterRepository;

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public Executor executor() {
            return new SyncTaskExecutor();
        }

        @Bean
        public TeamPlaceSseConverter testConvertor() {
            return new TestSseConverter();
        }

        public static class TestSseConverter implements TeamPlaceSseConverter<Long> {

            @Override
            public TeamPlaceSseEvent convert(DomainEvent<Long> event) {
                return ((TestDomainEvent) event).getTestSseEvent();
            }

            @Override
            public String supportEventName() {
                return TestDomainEvent.class.getName();
            }
        }

        public static class TestDomainEvent implements DomainEvent<Long> {

            private final Long id;
            private final TestSseEvent testSseEvent;

            public TestDomainEvent(final Long id, final TestSseEvent testSseEvent) {
                this.id = id;
                this.testSseEvent = testSseEvent;
            }

            @Override
            public Long getDomainId() {
                return id;
            }

            public TestSseEvent getTestSseEvent() {
                return testSseEvent;
            }
        }
    }

    @Test
    @DisplayName("발행된 이벤트로 SSE를 전송한다")
    void sendSseWithEmitter() throws IOException, InterruptedException {
        // given
        final Long teamPlaceId = 1L;
        final String eventName = "test_event";
        final String data = "{message: event}";
        final TestSseEvent testSseEvent = new TestSseEvent(teamPlaceId, eventName, data);

        final TeamPlaceEmitterId emitterId = TeamPlaceEmitterId.of(teamPlaceId, 1L);

        final SseEmitter sseEmitter = Mockito.mock(SseEmitter.class);
        final SseEmitter savedEmitter = teamPlaceEmitterRepository.save(emitterId, sseEmitter).getSingleEmitter();

        // when
        teamPlaceSsePublisher.publishEvent(new TestConfig.TestDomainEvent(1L, testSseEvent));

        Thread.sleep(1000);
        // then

        // verify if the SSE is sent
        ArgumentCaptor<SseEventBuilder> argumentCaptor = ArgumentCaptor.forClass(SseEventBuilder.class);
        verify(savedEmitter).send(argumentCaptor.capture());

        // verify the content of the SSE
        final Set<ResponseBodyEmitter.DataWithMediaType> properties = argumentCaptor.getValue().build();
        final String publishedSse = properties.stream()
                .map(ResponseBodyEmitter.DataWithMediaType::getData)
                .map(Object::toString)
                .collect(Collectors.joining());

        final String[] eventOutputs = publishedSse.split("\n");

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(eventOutputs[0]).startsWith("id:" + teamPlaceId + "_" + eventName + "_");
            softly.assertThat(eventOutputs[1]).isEqualTo("event:" + eventName);
            softly.assertThat(eventOutputs[2]).isEqualTo("data:{\"id\":1,\"data\":\"{message: event}\"}");
        });

        // remove cache
        teamPlaceEmitterRepository.closeById(emitterId);
    }
}
