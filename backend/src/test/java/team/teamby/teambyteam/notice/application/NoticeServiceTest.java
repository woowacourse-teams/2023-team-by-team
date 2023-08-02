package team.teamby.teambyteam.notice.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberException.MemberNotFoundException;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException.NotFoundException;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.*;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.*;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;

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
            final Long registeredId = noticeService.register(request, teamPlace.getId(), memberEmailDto);

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
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("조회한 팀 플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("공지 등록 시 멤버 ID에 해당하는 멤버가 존재하지 않으면 예외가 발생한다.")
        void failMemberNotExistById() {
            // given
            final Member nonExistMember = SEONGHA();

            // when & then
            assertThatThrownBy(() -> noticeService.register(request, teamPlace.getId(), new MemberEmailDto(nonExistMember.getEmail().getValue())))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("공지 조회 시")
    class findNotice {

        private Member member;
        private TeamPlace teamPlace;
        private NoticeRegisterRequest request;
        private List<Notice> notices;

        @BeforeEach
        void setUP() {
            member = testFixtureBuilder.buildMember(ROY());
            teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            request = FIRST_NOTICE_REGISTER_REQUEST;
            notices = testFixtureBuilder.buildNotices(
                    List.of(
                            NOTICE_1ST(teamPlace.getId(), member.getId()),
                            NOTICE_2ND(teamPlace.getId(), member.getId()),
                            NOTICE_3RD(teamPlace.getId(), member.getId()))
            );
        }

        @Test
        @DisplayName("공지 조회 시 가장 최근에 등록된 공지가 조회된다.")
        void successFindNotice() {
            // when
            final NoticeResponse noticeResponse = noticeService.findMostRecentNotice(teamPlace.getId());

            // then
            assertThat(noticeResponse.content()).isEqualTo("3rdNotice");
        }

        @Test
        @DisplayName("공지 조회 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistByIdFindingNotice() {
            // given
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> noticeService.findMostRecentNotice(notExistTeamPlaceId))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("조회한 팀 플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("조회할 공지가 없으면 null값을 반환한다.")
        void succeedFindEmptyNotice() {
            // given
            final TeamPlace additionalTeamPlace = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            // when
            final NoticeResponse noticeResponse = noticeService.findMostRecentNotice(additionalTeamPlace.getId());

            //then
            assertThat(noticeResponse).isNull();
        }

        @Test
        @DisplayName("조회할 공지를 작성한 Member의 Id값이 존재하지 않을 경우 예외가 발생한다.")
        void failMemberNotExistByIdFindingNotice() {
            // given
            final Long nonExistMemberId = -1L;
            testFixtureBuilder.buildNotice(NOTICE_1ST(teamPlace.getId(), nonExistMemberId));

            // when & then
            assertThatThrownBy(() -> noticeService.findMostRecentNotice(teamPlace.getId()))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }
}
