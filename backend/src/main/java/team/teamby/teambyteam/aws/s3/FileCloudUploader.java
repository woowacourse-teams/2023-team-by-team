package team.teamby.teambyteam.aws.s3;

import org.springframework.web.multipart.MultipartFile;

public interface FileCloudUploader {

    String upload(final MultipartFile multipartFile, final String directoryPath);
}
