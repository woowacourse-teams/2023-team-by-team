package team.teamby.teambyteam.feed.application;

import jakarta.transaction.Transactional;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.application.dto.ImageUrlResponse;
import team.teamby.teambyteam.feed.application.dto.ImageUrlsResponse;
import team.teamby.teambyteam.feed.application.dto.UploadImageRequest;
import team.teamby.teambyteam.feed.exception.FeedException;
import team.teamby.teambyteam.filesystem.AllowedImageExtension;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

@Deprecated
@RequiredArgsConstructor
@Service
@Transactional
public class ImageUploadService {

    private static final String HASHING_ALGORITHM = "SHA-256";
    private static final String HEX_FORMAT = "%02X";
    private static final int LIMIT_IMAGE_SIZE = 5242880;
    private static final int LIMIT_IMAGE_COUNT = 4;

    @Value("${aws.s3.image-directory}")
    private String imageDirectory;

    private final FileCloudUploader fileCloudUploader;

    public ImageUrlsResponse getImageUploadUrls(final MemberEmailDto memberEmailDto, final UploadImageRequest uploadImageRequest) {
        final List<ImageUrlResponse> responses = new ArrayList<>();
        validateImagesCount(uploadImageRequest.images());

        final String email = memberEmailDto.email();
        final String hashedEmail = hashEmail(email);
        for (final MultipartFile image : uploadImageRequest.images()) {
            validateImage(image);
            final String customKey = imageDirectory + "/" + UUID.randomUUID() + hashedEmail;
            final String uploadedFileUrl = fileCloudUploader.upload(image, customKey);
            responses.add(new ImageUrlResponse(image.getOriginalFilename(), uploadedFileUrl));
        }

        return new ImageUrlsResponse(responses);
    }

    private void validateImagesCount(final List<MultipartFile> images) {
        if (images.size() > LIMIT_IMAGE_COUNT) {
            throw new FeedException.ImageOverCountException(LIMIT_IMAGE_COUNT, images.size());
        }
    }

    private void validateImage(final MultipartFile image) {
        if (image.getSize() > LIMIT_IMAGE_SIZE) {
            throw new FeedException.ImageSizeException(LIMIT_IMAGE_SIZE, image.getSize());
        }
        if (AllowedImageExtension.isNotContain(getFileExtension(image))) {
            throw new FeedException.NotAllowedImageExtensionException(image.getOriginalFilename());
        }
    }

    private String getFileExtension(MultipartFile file) {
        final String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex >= 0 && dotIndex < originalFilename.length() - 1) {
                return originalFilename.substring(dotIndex + 1);
            }
        }

        throw new FeedException.NotFoundImageExtensionException(originalFilename);
    }

    private String hashEmail(final String email) {
        try {
            final MessageDigest md = MessageDigest.getInstance(HASHING_ALGORITHM);
            final byte[] hashBytes = md.digest(email.getBytes());
            final StringBuilder hexString = new StringBuilder();
            for (final byte b : hashBytes) {
                final String hex = String.format(HEX_FORMAT, b);
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
