package team.teamby.teambyteam.feed.application.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public record FeedThreadWritingRequest(
        String content,
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
