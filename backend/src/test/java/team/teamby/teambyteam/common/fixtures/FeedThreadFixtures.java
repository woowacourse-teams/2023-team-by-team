package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.vo.Content;

public class FeedThreadFixtures {

    /**
     * CONTENT
     */
    public static final String HELLO_CONTENT = "Hello";
    public static final String HI_CONTENT = "Hi";


    public static FeedThread HELLO_THREAD(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(HELLO_CONTENT), authorId);
    }

    public static FeedThread HI_THREAD(final Long teamPlaceId, final Long authorId) {
        return new FeedThread(teamPlaceId, new Content(HI_CONTENT), authorId);
    }
}
