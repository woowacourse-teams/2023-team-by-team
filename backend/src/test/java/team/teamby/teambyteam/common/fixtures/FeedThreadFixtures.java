package team.teamby.teambyteam.common.fixtures;

import org.springframework.mock.web.MockMultipartFile;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.vo.Content;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

public class FeedThreadFixtures {

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


    /**
     * CONTENT
     */
    public static final String CONTENT_AND_IMAGE = "Content And Image";
    public static final String CONTENT_ONLY_AND_IMAGE_EMPTY = "CONTENT ONLY";
    public static final String CONTENT_EMPTY_AND_IMAGE_ONLY = "";
    public static final String CONTENT_EMPTY_AND_IMAGE_EMPTY = "";

    /**
     * REQUEST
     */
    public static final FeedThreadWritingRequest CONTENT_ONLY_REQUEST = new FeedThreadWritingRequest(CONTENT_ONLY_AND_IMAGE_EMPTY, null);
    public static final FeedThreadWritingRequest IMAGE_ONLY_REQUEST = new FeedThreadWritingRequest(CONTENT_EMPTY_AND_IMAGE_ONLY,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));
    public static final FeedThreadWritingRequest CONTENT_AND_IMAGE_REQUEST = new FeedThreadWritingRequest(CONTENT_AND_IMAGE,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));

    public static final FeedThreadWritingRequest OVER_IMAGE_COUNT_REQUEST = new FeedThreadWritingRequest(CONTENT_AND_IMAGE,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4,
                    UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1));

    public static final FeedThreadWritingRequest OVER_IMAGE_SIZE_REQUEST = new FeedThreadWritingRequest(CONTENT_AND_IMAGE, List.of(OVER_SIZE_PNG_MOCK_MULTIPART_FILE));
    public static final FeedThreadWritingRequest NOT_ALLOWED_IMAGE_EXTENSION_REQUEST = new FeedThreadWritingRequest(CONTENT_AND_IMAGE, List.of(UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE));

    public static final FeedThreadWritingRequest EMPTY_REQUEST = new FeedThreadWritingRequest(CONTENT_EMPTY_AND_IMAGE_EMPTY, null);

    /**
     * ENTITY
     */
    public static FeedThread CONTENT_AND_IMAGE(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(CONTENT_AND_IMAGE), authorId);
    }

    public static FeedThread CONTENT_ONLY_AND_IMAGE_EMPTY(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(CONTENT_ONLY_AND_IMAGE_EMPTY), authorId);
    }

    public static FeedThread CONTENT_EMPTY_AND_IMAGE_ONLY(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(CONTENT_EMPTY_AND_IMAGE_ONLY), authorId);
    }
}
