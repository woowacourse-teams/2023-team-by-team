package team.teamby.teambyteam.notice.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.notice.exception.NoticeException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class NoticeServiceTest extends ServiceTest {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private NoticeRepository noticeRepository;


    @Nested
    @DisplayName("공지 등록 시")
    class RegisterNotice {

        @Test
        @DisplayName("공지 등록에 성공한다")
        void success() {
            //given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member member = testFixtureBuilder.buildMember(ROY());
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;

            //when
            final Long registeredId = noticeService.register(request, teamPlace.getId(), member.getId());

            //then
            assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("공지 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final Long notExistTeamPlaceId = -1L;
            final Member member = testFixtureBuilder.buildMember(ROY());
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;

            // when & then
            assertThatThrownBy(() -> noticeService.register(request, notExistTeamPlaceId, member.getId()))
                    .isInstanceOf(NoticeException.NotFoundTeamPlaceException.class)
                    .hasMessage("조회한 팀플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("공지 등록 시 멤버 ID에 해당하는 멤버가 존재하지 않으면 예외가 발생한다.")
        void failMemberNotExistById() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long notExistMemberId = -1L;
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;

            // when & then
            assertThatThrownBy(() -> noticeService.register(request, teamPlace.getId(), notExistMemberId))
                    .isInstanceOf(NoticeException.NotFoundMemberException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }
}

