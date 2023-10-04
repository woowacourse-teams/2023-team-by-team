package team.teamby.teambyteam.filesystem;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface FileCloudUploader {

    String upload(final MultipartFile multipartFile, final String directoryPath);

    String upload(final byte[] content, final String directoryPath);
}
