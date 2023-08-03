package team.teamby.teambyteam.notice.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.notice.domain.vo.Content;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.*;

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
        final List<Notice> notices = noticeRepository.findAllByTeamPlaceId(1L);

        // then
        assertSoftly(softly -> {
            softly.assertThat(notices).hasSize(2);
            softly.assertThat(notices.get(0)).isInstanceOf(Notice.class);
            softly.assertThat(notices.get(0).getContent()).isEqualTo(new Content("1stNotice"));
            softly.assertThat(notices.get(1)).isInstanceOf(Notice.class);
            softly.assertThat(notices.get(1).getContent()).isEqualTo(new Content("2ndNotice"));
        });
    }

    @Test
    @DisplayName("공지를 조회할 때 가장 최근에 등록된 공지가 반환된다.")
    void findMostRecentNoticeByTeamPlaceId() {
        // given
        final Long teamPlaceId = 1L;
        final Long authorId = 1L;
        final Notice firstNotice = testFixtureBuilder.buildNotice(NOTICE_1ST(teamPlaceId, authorId));
        final Notice secondNotice = testFixtureBuilder.buildNotice(NOTICE_2ND(teamPlaceId, authorId));
        final Notice thirdNotice = testFixtureBuilder.buildNotice(NOTICE_3RD(teamPlaceId, authorId));

        // when
        final Optional<Notice> findNotice = noticeRepository.findMostRecentByTeamPlaceId(1L);

        // then
        assertSoftly(softly -> {
            softly.assertThat(findNotice).isPresent();
            softly.assertThat(findNotice.get().getId()).isEqualTo(thirdNotice.getId());
            softly.assertThat(findNotice.get().getContent().getValue()).isEqualTo(thirdNotice.getContent().getValue());
        });
    }

    @Test
    @DisplayName("공지를 조회할 때 등록된 공지가 없을 경우 null을 반환한다.")
    void findEmptyNoticeByTeamPlaceId() {
        // given
        final Long nonExistTeamPlaceId = -1L;

        // when
        final Optional<Notice> nonExistNotice = noticeRepository.findMostRecentByTeamPlaceId(nonExistTeamPlaceId);

        // then
        assertThat(nonExistNotice).isEmpty();
    }
}
