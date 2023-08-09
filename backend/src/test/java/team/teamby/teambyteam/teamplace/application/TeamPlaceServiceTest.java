package team.teamby.teambyteam.teamplace.application;

import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceInviteCodeFixtures;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.member.domain.vo.DisplayTeamPlaceName;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.domain.RandomInviteCodeGenerator;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCodeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.domain.vo.Name;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Optional;

class TeamPlaceServiceTest extends ServiceTest {

    @Autowired
    private TeamPlaceService teamPlaceService;

    @Autowired
    private TeamPlaceRepository teamPlaceRepository;

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Autowired
    private TeamPlaceInviteCodeRepository teamPlaceInviteCodeRepository;

    @Autowired
    private RandomInviteCodeGenerator randomInviteCodeGenerator;

    @Nested
    @DisplayName("팀플레이스 생성시")
    class CreateTeamPlaceTest {

        @Test
        @DisplayName("생성에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final String TEAM_PLACE_NAME = "새로운 팀플레이스";

            // when
            final TeamPlaceCreateResponse response = teamPlaceService.create(new MemberEmailDto(PHILIP.getEmail().getValue()), new TeamPlaceCreateRequest(TEAM_PLACE_NAME));

            //then
            Optional<TeamPlace> createdTeamPlace = teamPlaceRepository.findById(response.teamPlaceId());
            Optional<MemberTeamPlace> memberTeamPlace = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(response.teamPlaceId(), PHILIP.getId());
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.teamPlaceId()).isNotNull();
                softly.assertThat(createdTeamPlace).isNotEmpty();
                softly.assertThat(createdTeamPlace.get().getName()).isEqualTo(new Name(TEAM_PLACE_NAME));
                softly.assertThat(memberTeamPlace).isNotEmpty();
                softly.assertThat(memberTeamPlace.get().getDisplayMemberName()).isEqualTo(new DisplayMemberName(PHILIP.getName().getValue()));
                softly.assertThat(memberTeamPlace.get().getDisplayTeamPlaceName()).isEqualTo(new DisplayTeamPlaceName(TEAM_PLACE_NAME));
            });
        }

        @Test
        @DisplayName("존재하지 않는 사용자 아이디로 요청시 실패한다.")
        void failWithUnauthorizedEmail() {
            // given
            final Member PHILIP = MemberFixtures.PHILIP();
            final String TEAM_PLACE_NAME = "새로운 팀플레이스";

            // when & then
            Assertions.assertThatThrownBy(() -> teamPlaceService.create(new MemberEmailDto(PHILIP.getEmail().getValue()), new TeamPlaceCreateRequest(TEAM_PLACE_NAME)))
                    .isInstanceOf(MemberException.MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("팀플레이스 초대코드 조회시")
    class TeamPlaceInviteCodeTest {

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final InviteCode inviteCode = new InviteCode(randomInviteCodeGenerator.generateRandomString());
            testFixtureBuilder.buildTeamPlaceInviteCode(TeamPlaceInviteCodeFixtures.TEAM_PLACE_INVITE_CODE(inviteCode, teamPlace));

            // when
            final TeamPlaceInviteCodeResponse response = teamPlaceService.getTeamPlaceInviteCode(teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response).isNotNull();
                softly.assertThat(response.teamPlaceId()).isEqualTo(teamPlace.getId());
                softly.assertThat(response.inviteCode()).isEqualTo(inviteCode.getValue());
            });
        }

        @Test
        @DisplayName("코드가 없는 경우 코드를 생성하여 반환한다.")
        void ifNotExistGenerateInviteCode() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final Optional<TeamPlaceInviteCode> notGeneratedInviteCode = teamPlaceInviteCodeRepository.findByTeamPlaceId(teamPlace.getId());

            // when
            final TeamPlaceInviteCodeResponse response = teamPlaceService.getTeamPlaceInviteCode(teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response).isNotNull();
                softly.assertThat(notGeneratedInviteCode).isEmpty();
                softly.assertThat(response.teamPlaceId()).isEqualTo(teamPlace.getId());
                softly.assertThat(response.inviteCode()).isNotEmpty();
            });
        }

        @Test
        @DisplayName("팀플레이스가 없는 경우 예외를 던진다.")
        void failIfNotExistTeamPlace() {
            // given
            final Long notExistTeamPlaceId = -1L;

            // when & then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> teamPlaceService.getTeamPlaceInviteCode(notExistTeamPlaceId))
                        .isInstanceOf(TeamPlaceException.NotFoundException.class)
                        .hasMessage("조회한 팀 플레이스가 존재하지 않습니다.");
            });
        }
    }
}