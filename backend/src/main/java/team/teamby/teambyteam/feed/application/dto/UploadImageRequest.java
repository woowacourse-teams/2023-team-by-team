package team.teamby.teambyteam.feed.application.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record UploadImageRequest(
        List<MultipartFile> images
) {
}
