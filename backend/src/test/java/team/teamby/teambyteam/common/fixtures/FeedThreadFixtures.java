package team.teamby.teambyteam.common.fixtures;


import static team.teamby.teambyteam.common.fixtures.FileFixtures.OVER_SIZE_PNG_MOCK_MULTIPART_FILE;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4;
import static team.teamby.teambyteam.common.fixtures.FileFixtures.UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE;

import java.util.List;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.vo.Content;

public class FeedThreadFixtures {

    /**
     * CONTENT
     */
    public static final String HELLO_CONTENT = "Hello";
    public static final String HI_CONTENT = "Hi";

    /**
     * REQUEST
     */
    public static final FeedThreadWritingRequest CONTENT_ONLY_REQUEST = new FeedThreadWritingRequest(HELLO_CONTENT, null);
    public static final FeedThreadWritingRequest IMAGE_ONLY_REQUEST = new FeedThreadWritingRequest("",
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));
    public static final FeedThreadWritingRequest CONTENT_AND_IMAGE_REQUEST = new FeedThreadWritingRequest(HELLO_CONTENT,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));

    public static final FeedThreadWritingRequest OVER_IMAGE_COUNT_REQUEST = new FeedThreadWritingRequest(HELLO_CONTENT,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE3, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE4,
                    UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1));

    public static final FeedThreadWritingRequest OVER_IMAGE_SIZE_REQUEST = new FeedThreadWritingRequest(HELLO_CONTENT, List.of(OVER_SIZE_PNG_MOCK_MULTIPART_FILE));
    public static final FeedThreadWritingRequest NOT_ALLOWED_IMAGE_EXTENSION_REQUEST = new FeedThreadWritingRequest(HELLO_CONTENT, List.of(UNDER_SIZE_WRONG_EXTENSION_MOCK_MULTIPART_FILE));

    public static final FeedThreadWritingRequest EMPTY_REQUEST = new FeedThreadWritingRequest("", null);
    public static final FeedThreadWritingRequest HI_WRITING_REQUEST = new FeedThreadWritingRequest(HI_CONTENT,
            List.of(UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1, UNDER_SIZE_PNG_MOCK_MULTIPART_FILE2));

    /**
     * ENTITY
     */
    public static FeedThread HELLO_THREAD(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(HELLO_CONTENT), authorId);
    }

    public static FeedThread HI_THREAD(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(HI_CONTENT), authorId);
    }
}
