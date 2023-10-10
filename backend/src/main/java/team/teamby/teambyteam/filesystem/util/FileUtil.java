package team.teamby.teambyteam.filesystem.util;

import java.util.Objects;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.feed.exception.FeedException;

public class FileUtil {

    private FileUtil() {}

    public static String getFileExtension(final MultipartFile file) {
        final String originalFilename = file.getOriginalFilename();
        if (Objects.nonNull(originalFilename)) {
            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex >= 0 && dotIndex < originalFilename.length() - 1) {
                return originalFilename.substring(dotIndex + 1);
            }
        }

        throw new FeedException.NotFoundImageExtensionException(originalFilename);
    }
}
