package team.teamby.teambyteam.filesystem;

import org.springframework.web.multipart.MultipartFile;

public interface FileCloudUploader {

    String upload(final MultipartFile multipartFile, final String directoryPath);
}
