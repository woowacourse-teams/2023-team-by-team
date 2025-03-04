package team.teamby.teambyteam.global.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

@Slf4j
@Component
public final class StompErrorHandler extends StompSubProtocolErrorHandler {
    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]> clientMessage, Throwable ex) {
        log.error("Stomp error occurred: {}\n{}\n{}", ex.getMessage(), clientMessage, ex.getCause().getMessage());

        return super.handleClientMessageProcessingError(clientMessage, ex);
    }
}
