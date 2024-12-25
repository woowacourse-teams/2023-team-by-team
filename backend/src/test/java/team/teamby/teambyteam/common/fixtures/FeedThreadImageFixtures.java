package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.feed.domain.image.Status;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;

public final class FeedThreadImageFixtures {

    public static final FeedThreadImage A_FEED_THREAD_IMAGE = new FeedThreadImage(new ImageUrl("aaa"), new ImageName("a"), Status.ACTIVATED);
    public static final FeedThreadImage B_FEED_THREAD_IMAGE = new FeedThreadImage(new ImageUrl("bbb"), new ImageName("b"), Status.ACTIVATED);

    public static final int IMAGE_EXPIRATION_DATE = 90;
}
