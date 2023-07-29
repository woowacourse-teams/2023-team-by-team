package team.teamby.teambyteam.notice.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import team.teamby.teambyteam.notice.domain.vo.Content;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class NoticeRepositoryTest {

    @Autowired
    private NoticeRepository noticeRepository;

    @Test
    void registerTeamPlaceId() {
        //given
        Notice notice = new Notice(new Content("테스트 공지"), 1L, 1L);

        noticeRepository.save(notice);

        List<Notice> notices = noticeRepository.findByTeamPlaceId(1L);

        assertSoftly(softly -> {
            softly.assertThat(notices).hasSize(1);
            softly.assertThat(notices.get(0)).isInstanceOf(Notice.class);
            softly.assertThat(notices.get(0).getContent()).isEqualTo(new Content("테스트 공지"));
        });
    }
}
