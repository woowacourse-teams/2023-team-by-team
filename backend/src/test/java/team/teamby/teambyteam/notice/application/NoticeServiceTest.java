package team.teamby.teambyteam.notice.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY_MEMBER_EMAIL_REQUEST;
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

        private TeamPlace teamPlace;
        private Member member;
        private NoticeRegisterRequest request;
        private MemberEmailDto memberEmailDto;

        @BeforeEach
        void setUP() {
            teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            member = testFixtureBuilder.buildMember(ROY());
            memberEmailDto = ROY_MEMBER_EMAIL_REQUEST;
            request = FIRST_NOTICE_REGISTER_REQUEST;
        }

        @Test
        @DisplayName("공지 등록에 성공한다")
        void success() {
            // when
            final Long registeredId = noticeService.register(request, teamPlace.getId(), new MemberEmailDto(member.getEmail().getValue()));

            // then
            assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("공지 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> noticeService.register(request, notExistTeamPlaceId, ROY_MEMBER_EMAIL_REQUEST))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("조회한 팀 플레이스가 존재하지 않습니다.");
        }
    }
}

