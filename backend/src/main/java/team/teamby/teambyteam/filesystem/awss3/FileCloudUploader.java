package team.teamby.teambyteam.filesystem.awss3;

import org.springframework.web.multipart.MultipartFile;

public interface FileCloudUploader {

    String upload(final MultipartFile multipartFile, final String directoryPath);
}
