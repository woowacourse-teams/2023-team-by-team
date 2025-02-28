package team.teamby.teambyteam.feed.presentation.websocket;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Controller;
import team.teamby.teambyteam.feed.application.FeedWriteService;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWebsocketWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedWebsocketResponse;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

@Controller
@RequiredArgsConstructor
public final class FeedThreadWebSocketController {

    private final FeedWriteService feedWriteService;

    @MessageMapping("/room/{teamplaceId}")
    @SendTo("/topic/room/{teamplaceId}")
    public Message<FeedWebsocketResponse> sendMessage(@DestinationVariable final Long teamplaceId,
                                                      @AuthPrincipal final MemberEmailDto memberEmailDto,
                                                      @Header("RequestId") String requestId,
                                                      @Valid @Payload final FeedThreadWebsocketWritingRequest request) {

        FeedWebsocketResponse feedWebsocketResponse = feedWriteService.writeFeedThread(teamplaceId, memberEmailDto, requestId, request);

        return MessageBuilder
                .withPayload(feedWebsocketResponse)
                .setHeader("RequestId", requestId)
                .build();
    }
}
