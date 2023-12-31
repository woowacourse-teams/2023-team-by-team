package team.teamby.teambyteam.filesystem;

import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.filesystem.exception.FileControlException;

public interface FileStorageManager {

    /**
     * MultipartFile 요청으로 전달된 파일을 그대로 저장
     *
     * @param multipartFile     파일 업로드 Request에 포함된 MultipartFile
     * @param nameAndPathToSave 디렉터리를 포함한 파일이 저장될 이름
     * @param originalFileName  원본 파일의 이름
     * @return 저장된 파일로 접근할 수 있는 URL
     */
    String upload(final MultipartFile multipartFile, final String nameAndPathToSave, final String originalFileName) throws FileControlException;

    /**
     * byte array 데이터를 파일로 저장
     *
     * @param content           업로드할 파일의 byte 정보
     * @param nameAndPathToSave 디렉터리를 포함한 파일이 저장될 이름
     * @param originalFileName  원본 파일의 이름
     * @return 저장된 파일로 접근할 수 있는 URL
     */
    String upload(final byte[] content, final String nameAndPathToSave, final String originalFileName) throws FileControlException;

    /**
     * 파일 삭제 요청
     *
     * @param accessUrl 리소스 접근 URL
     */
    void delete(final String accessUrl) throws FileControlException;
}
