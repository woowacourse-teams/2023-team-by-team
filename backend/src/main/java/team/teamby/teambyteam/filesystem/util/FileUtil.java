package team.teamby.teambyteam.filesystem.util;

import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.filesystem.exception.FileControlException;

import java.util.Objects;

public class FileUtil {

    private FileUtil() {
    }

    public static String getFileExtension(final MultipartFile file) {
        final String originalFilename = file.getOriginalFilename();
        if (Objects.nonNull(originalFilename)) {
            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex >= 0 && dotIndex < originalFilename.length() - 1) {
                return originalFilename.substring(dotIndex + 1);
            }
        }

        throw new FileControlException.FileExtensionException("파일 확장자를 찾을 수 없습니다.");
    }
}
