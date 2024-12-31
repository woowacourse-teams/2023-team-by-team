package team.teamby.teambyteam.feed.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;
import team.teamby.teambyteam.feed.application.dto.UploadImageRequest;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImageRepository;
import team.teamby.teambyteam.feed.domain.image.Status;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.filesystem.ImageValidationService;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedImageService {

    private final FeedThreadImageRepository feedThreadImageRepository;

    private final FileStorageManager fileStorageManager;
    private final ImageValidationService imageValidationService;

    @Value("${aws.s3.image-directory}")
    private String imageDirectory;

    public List<FeedImageResponse> uploadImages(final UploadImageRequest uploadImageRequest) {
        final List<MultipartFile> images = uploadImageRequest.images();
        validateImages(images);

        return images.stream().map(image -> {
                    final String originalFilename = image.getOriginalFilename();
                    final String generatedImageUrl = fileStorageManager.upload(image, imageDirectory + "/" + UUID.randomUUID(), originalFilename);
                    final ImageUrl imageUrl = new ImageUrl(generatedImageUrl);
                    final ImageName imageName = new ImageName(originalFilename);
                    final FeedThreadImage feedThreadImage = new FeedThreadImage(imageUrl, imageName, Status.PENDING);
                    return feedThreadImageRepository.save(feedThreadImage);
                })
                .map(FeedImageResponse::from)
                .toList();
    }

    private void validateImages(final List<MultipartFile> images) {
        images.forEach(imageValidationService::validateImage);
    }
}
