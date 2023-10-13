package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.notice.domain.image.NoticeImage;
import team.teamby.teambyteam.notice.domain.image.vo.ImageName;
import team.teamby.teambyteam.notice.domain.image.vo.ImageUrl;

public class NoticeImageFixtures {

    public static final NoticeImage A_NOTICE_IMAGE = new NoticeImage(new ImageUrl("aaa"), new ImageName("a"));
    public static final NoticeImage B_NOTICE_IMAGE = new NoticeImage(new ImageUrl("aaa"), new ImageName("a"));

    public static final int IMAGE_EXPIRATION_DATE = 90;
}
