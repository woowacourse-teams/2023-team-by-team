package team.teamby.teambyteam.feed.application.dto;

import jakarta.validation.constraints.Size;

import java.util.List;

public record FeedThreadWebsocketWritingRequest(
        String content,
        @Size(max = 4, message = "이미지는 최대 4개까지 첨부할 수 있습니다.")
        List<Long> imageIds
) {
}
