package team.teamby.teambyteam.filesystem;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.exception.FeedNotFoundImageExtensionException;
import team.teamby.teambyteam.filesystem.exception.FileControlException;
import team.teamby.teambyteam.filesystem.exception.ImageSizeException;
import team.teamby.teambyteam.filesystem.exception.NotAllowedImageExtensionException;
import team.teamby.teambyteam.filesystem.util.FileUtil;

@Service
public class ImageValidationService {

    private static final int LIMIT_IMAGE_SIZE = 5242880;

    public void validateImage(final MultipartFile image) {
        if (image.getSize() > LIMIT_IMAGE_SIZE) {
            throw new ImageSizeException(LIMIT_IMAGE_SIZE, image.getSize());
        }
        if (AllowedImageExtension.isNotContain(getFileExtension(image))) {
            throw new NotAllowedImageExtensionException(image.getOriginalFilename());
        }
    }

    private String getFileExtension(final MultipartFile file) {
        try {
            return FileUtil.getFileExtension(file);
        } catch (final FileControlException.FileExtensionException e) {
            throw new FeedNotFoundImageExtensionException(file.getOriginalFilename());
        }
    }
}
