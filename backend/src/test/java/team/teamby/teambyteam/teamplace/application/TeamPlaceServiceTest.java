package team.teamby.teambyteam.teamplace.application;

import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceInviteCodeFixtures;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.member.domain.vo.DisplayTeamPlaceName;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.member.exception.memberteamplace.NotFoundParticipatedTeamPlaceException;
import team.teamby.teambyteam.teamplace.application.dto.DisplayMemberNameChangeRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceChangeColorRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMemberResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMembersResponse;
import team.teamby.teambyteam.teamplace.domain.RandomInviteCodeGenerator;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCodeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.domain.vo.Name;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ENDEL;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.SEONGHA;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
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
            final Member PHILIP = PHILIP();
            final String TEAM_PLACE_NAME = "새로운 팀플레이스";

            // when & then
            Assertions.assertThatThrownBy(() -> teamPlaceService.create(new MemberEmailDto(PHILIP.getEmail().getValue()), new TeamPlaceCreateRequest(TEAM_PLACE_NAME)))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("팀플레이스 초대코드 조회시")
    class TeamPlaceInviteCodeTest {

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
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
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
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
                        .isInstanceOf(TeamPlaceNotFoundException.class)
                        .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
            });
        }
    }

    @Nested
    @DisplayName("팀 플레이스 참여 멤버 조회 시")
    class FindMembers {

        @Test
        @DisplayName("팀 플레이스 참여 멤버 조회에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final Member ROY = testFixtureBuilder.buildMember(ROY());
            final Member SEONGHA = testFixtureBuilder.buildMember(SEONGHA());
            final Member ENDEL = testFixtureBuilder.buildMember(ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

            final MemberTeamPlace memberTeamPlace1 = testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final MemberTeamPlace memberTeamPlace2 = testFixtureBuilder.buildMemberTeamPlace(ROY, ENGLISH_TEAM_PLACE);
            final MemberTeamPlace memberTeamPlace3 = testFixtureBuilder.buildMemberTeamPlace(SEONGHA, ENGLISH_TEAM_PLACE);
            final MemberTeamPlace memberTeamPlace4 = testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            final List<MemberTeamPlace> memberTeamPlaces = List.of(memberTeamPlace1, memberTeamPlace2, memberTeamPlace3, memberTeamPlace4);
            final List<TeamPlaceMemberResponse> teamPlaceMembers = memberTeamPlaces.stream()
                    .map(memberTeamPlace -> TeamPlaceMemberResponse.of(memberTeamPlace, PHILIP))
                    .toList();

            final TeamPlaceMembersResponse expectedResponse = TeamPlaceMembersResponse.from(teamPlaceMembers);

            // when
            final TeamPlaceMembersResponse actualResponse = teamPlaceService.findMembers(ENGLISH_TEAM_PLACE.getId(), new MemberEmailDto(PHILIP.getEmail().getValue()));

            // then
            assertThat(actualResponse).usingRecursiveComparison().isEqualTo(expectedResponse);
        }
    }

    @Nested
    @DisplayName("팀 플레이스 색상 변경 시")
    class ChangeTeamPlaceColor {

        @Test
        @DisplayName("변경에 성공한다.")
        void success() {
            // given
            final Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);

            final MemberEmailDto memberEmailDto = new MemberEmailDto(member.getEmail().getValue());
            final Long teamPlaceId = teamPlace.getId();
            final int teamPlaceColorToChange = 9;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when
            teamPlaceService.changeMemberTeamPlaceColor(memberEmailDto, teamPlaceId, request);
            final MemberTeamPlace findMemberTeamPlace =
                    memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlace.getId(), member.getId()).get();

            // then
            assertThat(findMemberTeamPlace.getTeamPlaceColor().getColorNumber()).isEqualTo(teamPlaceColorToChange);
        }

        @Test
        @DisplayName("이메일에 해당하는 멤버가 없으면 예외가 발생한다.")
        void failWhenNotExistMemberEmail() {
            // given
            final Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
            final String notExistMemberEmail = "notExistMemberEmail@gmail.com";

            final MemberEmailDto memberEmailDto = new MemberEmailDto(notExistMemberEmail);
            final Long teamPlaceId = teamPlace.getId();
            final int teamPlaceColorToChange = 9;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when & then
            assertThatThrownBy(() -> teamPlaceService.changeMemberTeamPlaceColor(memberEmailDto, teamPlaceId, request))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessage(String.format("조회한 멤버가 존재하지 않습니다. - request info { email : %s }",
                            notExistMemberEmail));
        }

        @Test
        @DisplayName("팀 플레이스 ID, 멤버 ID에 해당하는 MemberTeamPlace가 없으면 예외가 발생한다.")
        void failWhenNotExistMemberTeamPlace() {
            // given
            final Member member = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

            final MemberEmailDto memberEmailDto = new MemberEmailDto(member.getEmail().getValue());
            final Long teamPlaceId = teamPlace.getId();
            final int teamPlaceColorToChange = 9;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(teamPlaceColorToChange);

            // when & then
            assertThatThrownBy(() -> teamPlaceService.changeMemberTeamPlaceColor(memberEmailDto, teamPlaceId, request))
                    .isInstanceOf(NotFoundParticipatedTeamPlaceException.class)
                    .hasMessage(String.format(
                            "해당 팀 플레이스에 가입되어 있지 않습니다. - request info { member_email : %s, team_place_id : %d }",
                            memberEmailDto.email(),
                            teamPlaceId));
        }
    }

    @Nested
    @DisplayName("팀플레이스 내 사용자 명 변경 요청시")
    class ChangeDisplayMemberName {

        @Test
        @DisplayName("사용자 명 변경에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace DYNAMICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.DYNAMICS_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, DYNAMICS_TEAM_PLACE);
            final String CHANGED_NAME = "새로 태어난 필립";

            // when
            teamPlaceService.changeDisplayMemberName(DYNAMICS_TEAM_PLACE.getId(), new DisplayMemberNameChangeRequest(CHANGED_NAME), new MemberEmailDto(PHILIP.getEmail().getValue()));

            // then
            final Optional<MemberTeamPlace> changedResult = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(DYNAMICS_TEAM_PLACE.getId(), PHILIP.getId());
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(changedResult).isPresent();
                softly.assertThat(changedResult.get().getDisplayMemberName()).isEqualTo(new DisplayMemberName(CHANGED_NAME));
            });
        }

        @Test
        @DisplayName("소속되지 않은 팀플레이스의 이름 변경 요청시 실패한다.")
        void failWithUnparticipatedTeamPlaceRequest() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace DYNAMICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.DYNAMICS_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, DYNAMICS_TEAM_PLACE);
            final String CHANGED_NAME = "새로 태어난 필립";
            final long WRONG_TEAM_PLACE_ID = -1;

            // when & then
            Assertions.assertThatThrownBy(() ->
                            teamPlaceService.changeDisplayMemberName(
                                    WRONG_TEAM_PLACE_ID,
                                    new DisplayMemberNameChangeRequest(CHANGED_NAME),
                                    new MemberEmailDto(PHILIP.getEmail().getValue())
                            ))
                    .isInstanceOf(NotFoundParticipatedTeamPlaceException.class)
                    .hasMessageContaining("해당 팀 플레이스에 가입되어 있지 않습니다.");
        }
    }
}
