package team.teamby.teambyteam.notice.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY_MEMBER_EMAIL_REQUEST;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.SEONGHA;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.CONTENT_AND_IMAGE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_1ST;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_2ND;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_3RD;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.THIRD_CONTENT;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.FeedThreadImageFixtures;
import team.teamby.teambyteam.common.fixtures.NoticeImageFixtures;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.exception.MemberException.MemberNotFoundException;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException.NotFoundException;

class NoticeServiceTest extends ServiceTest {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private NoticeRepository noticeRepository;

    @MockBean
    private FileCloudUploader fileCloudUploader;

    @SpyBean
    private Clock clock;

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
            request = CONTENT_AND_IMAGE_REQUEST;
            given(fileCloudUploader.upload(any(MultipartFile.class), any(String.class)))
                    .willReturn("https://s3://seongha-seeik");
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
                    .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("공지 등록 시 멤버 ID에 해당하는 멤버가 존재하지 않으면 예외가 발생한다.")
        void failMemberNotExistById() {
            // given
            final Member nonExistMember = SEONGHA();

            // when & then
            assertThatThrownBy(() -> noticeService.register(request, teamPlace.getId(), new MemberEmailDto(nonExistMember.getEmail().getValue())))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("공지 조회 시")
    class findNotice {

        private Member member;
        private TeamPlace teamPlace;
        private MemberTeamPlace memberTeamPlace;
        private List<Notice> notices;

        @BeforeEach
        void setUP() {
            member = testFixtureBuilder.buildMember(ROY());
            teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            memberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
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
            // given
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(0), NoticeImageFixtures.A_NOTICE_IMAGE);
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(1), NoticeImageFixtures.B_NOTICE_IMAGE);
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(2), NoticeImageFixtures.B_NOTICE_IMAGE);

            // when
            final Optional<NoticeResponse> noticeResponse = noticeService.findMostRecentNotice(teamPlace.getId());

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(noticeResponse).isPresent();
                softly.assertThat(noticeResponse.get().content()).isEqualTo("3rdNotice");
                softly.assertThat(noticeResponse.get().authorId()).isEqualTo(member.getId());
                softly.assertThat(noticeResponse.get().authorName()).isEqualTo(memberTeamPlace.getDisplayMemberName().getValue());
                softly.assertThat(noticeResponse.get().images()).hasSize(1);
            });
        }

        @Test
        @DisplayName("90일이 지난 공지를 조회하면 만료된 공지 이미지로 조회된다.")
        void imageExpireAfter90Days() {
            // given
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(0), NoticeImageFixtures.A_NOTICE_IMAGE);
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(1), NoticeImageFixtures.B_NOTICE_IMAGE);
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(2), NoticeImageFixtures.B_NOTICE_IMAGE);

            final Instant expiredDate = LocalDateTime.now().plusDays(FeedThreadImageFixtures.IMAGE_EXPIRATION_DATE).plusNanos(1).toInstant(
                    ZoneOffset.systemDefault().getRules().getOffset(LocalDateTime.now()));
            given(clock.instant()).willReturn(expiredDate);

            // when
            final Optional<NoticeResponse> noticeResponse = noticeService.findMostRecentNotice(teamPlace.getId());

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(noticeResponse).isPresent();
                softly.assertThat(noticeResponse.get().content()).isEqualTo("3rdNotice");
                softly.assertThat(noticeResponse.get().authorId()).isEqualTo(member.getId());
                softly.assertThat(noticeResponse.get().authorName()).isEqualTo(memberTeamPlace.getDisplayMemberName().getValue());
                softly.assertThat(noticeResponse.get().images().get(0).isExpired()).isTrue();
            });
        }

        @Test
        @DisplayName("공지 조회 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistByIdFindingNotice() {
            // given
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> noticeService.findMostRecentNotice(notExistTeamPlaceId))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("조회할 공지가 없으면 빈 Optional 객체를 반환한다.")
        void succeedFindEmptyNotice() {
            // given
            final TeamPlace additionalTeamPlace = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final TeamPlace registerdTeamplace = testFixtureBuilder.buildTeamPlace(additionalTeamPlace);

            // when
            Optional<NoticeResponse> noticeResponse = noticeService.findMostRecentNotice(registerdTeamplace.getId());

            //then
            assertThat(noticeResponse).isEmpty();
        }

        @Test
        @DisplayName("공지작성자가 탈퇴한 경우 알수없는 사용자의 정보로 공지를 조회한다.")
        void successWithUnknownMemberLeaveFromService() {
            // given
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(0), NoticeImageFixtures.A_NOTICE_IMAGE);
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(1), NoticeImageFixtures.B_NOTICE_IMAGE);
            testFixtureBuilder.buildNoticeNoticeImage(notices.get(2), NoticeImageFixtures.B_NOTICE_IMAGE);

            testFixtureBuilder.deleteMember(member);

            // when
            Optional<NoticeResponse> response = noticeService.findMostRecentNotice(teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response).isPresent();
                softly.assertThat(response.get().authorId()).isNull();
                softly.assertThat(response.get().authorName()).isEqualTo(Member.UNKNOWN_MEMBER_NAME);
                softly.assertThat(response.get().content()).isEqualTo(THIRD_CONTENT);
                softly.assertThat(response.get().images()).hasSize(1);
            });
        }

        @Test
        @DisplayName("공지작성자가 팀플레이스를 탈퇴한 경우 알수없는 사용자의 정보로 공지를 조회한다.")
        void successWithUnknownMemberLeaveFromTeamPlace() {
            // given
            member.leaveTeamPlace(teamPlace.getId());
            testFixtureBuilder.deleteMemberTeamPlace(memberTeamPlace);

            // when
            Optional<NoticeResponse> response = noticeService.findMostRecentNotice(teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response).isPresent();
                softly.assertThat(response.get().authorId()).isNull();
                softly.assertThat(response.get().authorName()).isEqualTo(Member.UNKNOWN_MEMBER_NAME);
                softly.assertThat(response.get().content()).isEqualTo(THIRD_CONTENT);
            });
        }
    }
}
