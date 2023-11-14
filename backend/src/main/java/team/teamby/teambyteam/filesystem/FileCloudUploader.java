package team.teamby.teambyteam.filesystem;

import org.springframework.web.multipart.MultipartFile;

public interface FileCloudUploader {

    /**
     * MultipartFile 요청으로 전달된 파일을 그대로 저장
     *
     * @param multipartFile 파일 업로드 Request에 포함된 MultipartFile
     * @param directoryPath 디렉터리를 포함한 파일이 저장될 이름
     * @param originalFileName 원본 파일의 이름
     * @return 저장된 파일로 접근할 수 있는 URL
     */
    String upload(final MultipartFile multipartFile, final String directoryPath, final String originalFileName);

    /**
     * byte array 데이터를 파일로 저장
     *
     * @param content 업로드할 파일의 byte 정보
     * @param directoryPath 디렉터리를 포함한 파일이 저장될 이름
     * @param originalFileName 원본 파일의 이름
     * @return 저장된 파일로 접근할 수 있는 URL
     */
    String upload(final byte[] content, final String directoryPath, final String originalFileName);

    /**
     * 파일 삭제 요청
     *
     * @param filename 디렉토리와 확장자를 포함한 파일 이름
     * @return true : 삭제 성공시, false : 삭제 실패시
     */
    boolean delete(final String filename);
}
