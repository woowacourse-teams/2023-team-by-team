package team.teamby.teambyteam.feed.application.dto;

import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public record FeedThreadWritingRequest(
        String content,
        @Size(max = 4, message = "이미지는 최대 4개까지 첨부할 수 있습니다.")
        List<MultipartFile> images
) {

    @Override
    public List<MultipartFile> images() {
        if (Objects.isNull(images)) {
            return Collections.emptyList();
        }

        return images;
    }
}
