package team.teamby.teambyteam.common.fixtures;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.mock.web.MockMultipartFile;

public class FileFixtures {

    /**
     * FILE
     */
    public static final File UNDER_SIZE_PNG_FILE1 = new File("src/test/resources/images/infra-under-size.png");
    public static final File UNDER_SIZE_PNG_FILE2 = new File("src/test/resources/images/logo-under-size.png");
    public static final File UNDER_SIZE_PNG_FILE3 = new File("src/test/resources/images/ci-cd-under-size.png");
    public static final File UNDER_SIZE_PNG_FILE4 = new File("src/test/resources/images/diagram-under-size.png");
    public static final File OVER_SIZE_PNG_FILE = new File("src/test/resources/images/over-size-image.png");
    public static final File UNDER_SIZE_WRONG_EXTENSION_FILE = new File("src/test/resources/images/wrong-extension-file.pptx");

    /**
     * MOCK_MULTIPART_FILE
     */
    public static final MockMultipartFile UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1;
    public static final MockMultipartFile UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2;
    public static final MockMultipartFile UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3;
    public static final MockMultipartFile UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4;
    public static final MockMultipartFile OVER_SIZE_PNG_MOCK_MULTIPART_FILE;
    public static final MockMultipartFile UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE;

    static {
        try {
            UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1 = new MockMultipartFile("under-size1",
                    UNDER_SIZE_PNG_FILE1.getName(), "image/png", new FileInputStream(UNDER_SIZE_PNG_FILE1));

            UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2 = new MockMultipartFile("under-size2",
                    UNDER_SIZE_PNG_FILE1.getName(), "image/png", new FileInputStream(UNDER_SIZE_PNG_FILE2));

            UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3 = new MockMultipartFile("under-size3",
                    UNDER_SIZE_PNG_FILE1.getName(), "image/png", new FileInputStream(UNDER_SIZE_PNG_FILE3));

            UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4 = new MockMultipartFile("under-size4",
                    UNDER_SIZE_PNG_FILE1.getName(), "image/png", new FileInputStream(UNDER_SIZE_PNG_FILE4));

            OVER_SIZE_PNG_MOCK_MULTIPART_FILE = new MockMultipartFile("over-size",
                    UNDER_SIZE_PNG_FILE1.getName(), "image/png", new FileInputStream(OVER_SIZE_PNG_FILE));

            UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE = new MockMultipartFile("under-size-wrong-extension",
                    UNDER_SIZE_WRONG_EXTENSION_FILE.getName(), "application/vnd.openxmlformats-officedocument.presentationml.presentation", new FileInputStream(UNDER_SIZE_WRONG_EXTENSION_FILE));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
