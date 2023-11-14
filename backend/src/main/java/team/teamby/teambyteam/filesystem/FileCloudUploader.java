package team.teamby.teambyteam.filesystem;

import org.springframework.web.multipart.MultipartFile;

public interface FileCloudUploader {

    String upload(final MultipartFile multipartFile, final String directoryPath, final String originalFileName);

    String upload(final byte[] content, final String directoryPath, final String originalFileName);

    boolean delete(final String filename);
}
