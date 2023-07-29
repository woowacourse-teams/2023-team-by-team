package team.teamby.teambyteam.notice.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.notice.domain.vo.Content;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_1ST;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_2ND;

class NoticeRepositoryTest extends RepositoryTest {

    @Autowired
    private NoticeRepository noticeRepository;

    @Test
    @DisplayName("팀 공지 등록 후 해당 공지를 조회한다.")
    void registerNoticeAndFindByTeamPlaceId() {
        // given
        final Notice firstNotice = NOTICE_1ST(1L, 1L);
        final Notice secondNotice = NOTICE_2ND(1L, 1L);
        noticeRepository.save(firstNotice);
        noticeRepository.save(secondNotice);

        // when
        final List<Notice> notices = noticeRepository.findByTeamPlaceId(1L);

        // then
        assertSoftly(softly -> {
            softly.assertThat(notices).hasSize(2);
            softly.assertThat(notices.get(0)).isInstanceOf(Notice.class);
            softly.assertThat(notices.get(0).getContent()).isEqualTo(new Content("1stNotice"));
            softly.assertThat(notices.get(1)).isInstanceOf(Notice.class);
            softly.assertThat(notices.get(1).getContent()).isEqualTo(new Content("2ndNotice"));
        });
    }
}
