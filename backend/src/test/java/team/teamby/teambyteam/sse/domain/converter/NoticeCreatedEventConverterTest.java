package team.teamby.teambyteam.sse.domain.converter;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import team.teamby.teambyteam.common.builder.TestFixtureBuilder;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.NoticeFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.event.NoticeCreationEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Sql({"/h2-truncate.sql"})
class NoticeCreatedEventConverterTest {

    @Autowired
    private NoticeCreatedEventConverter noticeCreatedEventConverter;

    @Autowired
    private TestFixtureBuilder testFixtureBuilder;

    @Test
    @DisplayName("NoticeCreatedEvent 지원 확인")
    void isSupportNoticeCreatedEvent() {
        // given
        final String expected = NoticeCreationEvent.class.getName();

        // when
        final String actual = noticeCreatedEventConverter.supportEventName();

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("Notice 이벤트 변환 테스트")
    void convert() {
        // given
        final Member member = testFixtureBuilder.buildMember(MemberFixtures.ROY());
        final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.CONTROLS_TEAM_PLACE());
        testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
        final Notice createdNotice = testFixtureBuilder.buildNotice(NoticeFixtures.NOTICE_1ST(teamPlace.getId(), member.getId()));

        final NoticeCreationEvent noticeCreationEvent = new NoticeCreationEvent(createdNotice);

        // when
        final TeamPlaceSseEvent convertedEvent = noticeCreatedEventConverter.convert(noticeCreationEvent);

        // then
        assertThat(convertedEvent.getTeamPlaceId()).isEqualTo(teamPlace.getId());

    }
}
