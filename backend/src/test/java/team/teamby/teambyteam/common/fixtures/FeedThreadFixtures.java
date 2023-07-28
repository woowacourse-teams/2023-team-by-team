package team.teamby.teambyteam.common.fixtures;

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
    public static final FeedThreadWritingRequest HELLO_WRITING_REQUEST = new FeedThreadWritingRequest(HELLO_CONTENT);
    public static final FeedThreadWritingRequest HI_WRITING_REQUEST = new FeedThreadWritingRequest(HI_CONTENT);

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
