package team.teamby.teambyteam.member.application;

import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.application.dto.MemberInfoResponse;
import team.teamby.teambyteam.member.application.dto.TeamPlaceResponse;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.application.event.MemberLeaveEvent;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.application.dto.MemberUpdateRequest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.member.exception.MemberNameBlankException;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.member.exception.MemberNameLengthException;
import team.teamby.teambyteam.member.exception.memberteamplace.NotFoundParticipatedTeamPlaceException;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.exception.invitecode.TeamPlaceInviteCodeNotFoundException;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP_NAME;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.STATICS_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceInviteCodeFixtures.TEAM_PLACE_INVITE_CODE;

class MemberServiceTest extends ServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Nested
    @DisplayName("사용자가 속한 팀플레이스들의 정보 조회시")
    class FindAllParticipatedTeamPlaceInfo {

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final TeamPlace STATICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(STATICS_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, STATICS_TEAM_PLACE);

            // when
            final TeamPlacesResponse response = memberService.getParticipatedTeamPlaces(new MemberEmailDto(ENDEL.getEmail().getValue()));

            //then
            final List<TeamPlaceResponse> teamPlaceResponses = response.teamPlaces();
            assertSoftly(softly -> {
                softly.assertThat(teamPlaceResponses).hasSize(3);
                softly.assertThat(teamPlaceResponses.get(0).id()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
                softly.assertThat(teamPlaceResponses.get(0).displayName()).isEqualTo(ENGLISH_TEAM_PLACE.getName().getValue());
                softly.assertThat(teamPlaceResponses.get(1).id()).isEqualTo(JAPANESE_TEAM_PLACE.getId());
                softly.assertThat(teamPlaceResponses.get(1).displayName()).isEqualTo(JAPANESE_TEAM_PLACE.getName().getValue());
                softly.assertThat(teamPlaceResponses.get(2).id()).isEqualTo(STATICS_TEAM_PLACE.getId());
                softly.assertThat(teamPlaceResponses.get(2).displayName()).isEqualTo(STATICS_TEAM_PLACE.getName().getValue());
            });
        }


        @Test
        @DisplayName("소속된 팀 플레이스가 없으면 빈배열을 반환한다")
        void getWithEmptyArray() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());

            // when
            final TeamPlacesResponse response = memberService.getParticipatedTeamPlaces(new MemberEmailDto(ENDEL.getEmail().getValue()));

            //then
            assertThat(response.teamPlaces()).hasSize(0);
        }
    }

    @Nested
    @DisplayName("팀플레이스에서 탈퇴시")
    class LeaveTeamPlace {

        @Test
        @DisplayName("팀플레이스 탈퇴에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            // when
            memberService.leaveTeamPlace(new MemberEmailDto(ENDEL.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId());

            //then
            final List<MemberTeamPlace> allParticipatedTeamPlaces = memberTeamPlaceRepository.findAllByMemberId(ENDEL.getId());
            assertThat(allParticipatedTeamPlaces).hasSize(0);
        }

        @Test
        @DisplayName("데이터에 없는 사용자의 이메일 입력시 실패한다.")
        void failWithMemberWithoutDb() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            // when & then
            assertThatThrownBy(() -> memberService.leaveTeamPlace(new MemberEmailDto(MemberFixtures.PHILIP_EMAIL), ENGLISH_TEAM_PLACE.getId()))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("소속되지 않은 팀플레이스 탈퇴 시도시 접근할 수 없다는 예외를 발생시킨다.")
        void failWithUnParticipatedTeamPlace() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);

            // when & then
            assertThatThrownBy(() -> memberService.leaveTeamPlace(new MemberEmailDto(ENDEL.getEmail().getValue()), JAPANESE_TEAM_PLACE.getId()))
                    .isInstanceOf(NotFoundParticipatedTeamPlaceException.class)
                    .hasMessageContaining("해당 팀 플레이스에 가입되어 있지 않습니다.");
        }
    }

    @Nested
    @DisplayName("멤버가 초대코드로 팀플레이스 참여")
    class ParticipateTeamPlaceByInviteCode {

        @Test
        @DisplayName("참여에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));

            // when
            final TeamPlaceParticipantResponse response = memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), inviteCode);

            //then
            assertSoftly(softly -> {
                softly.assertThat(PHILIP.isMemberOf(ENGLISH_TEAM_PLACE.getId())).isTrue();
                softly.assertThat(response.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("중복 참여의 경우 계속 동일한 TeamPlaceParticipantResponse를 반환한다.")
        void ifDuplicateRequest() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), inviteCode);

            // when
            final TeamPlaceParticipantResponse response = memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), inviteCode);

            //then
            assertSoftly(softly -> {
                softly.assertThat(PHILIP.isMemberOf(ENGLISH_TEAM_PLACE.getId())).isTrue();
                softly.assertThat(response.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("존재하지 않는 사용자의 경우 예외가 발생한다.")
        void failIfNotExistsMember() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            final String invalidEmail = "email@email.com";

            // when & then
            assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> memberService.participateTeamPlace(new MemberEmailDto(invalidEmail), inviteCode))
                        .isInstanceOf(MemberNotFoundException.class)
                        .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
            });
        }

        @Test
        @DisplayName("존재하지 않는 참여코드의 경우 예외가 발생한다.")
        void failIfNotExistsInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final String invalidInviteCode = "aaaaaaaa";

            // when & then
            assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), invalidInviteCode))
                        .isInstanceOf(TeamPlaceInviteCodeNotFoundException.class)
                        .hasMessageContaining("존재하지 않는 초대코드 입니다.");
            });
        }
    }

    @Nested
    @DisplayName("사용자의 정보시")
    class GetMyInformation {

        @Test
        @DisplayName("정보 조회에 성공한다.")
        void success() {
            // given
            final Member REGISTERED_MEMBER = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());

            // when
            final MemberInfoResponse response = memberService.getMemberInformation(new MemberEmailDto(REGISTERED_MEMBER.getEmail().getValue()));

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.id()).isEqualTo(REGISTERED_MEMBER.getId());
                softly.assertThat(response.name()).isEqualTo(REGISTERED_MEMBER.getName().getValue());
                softly.assertThat(response.profileImageUrl()).isEqualTo(REGISTERED_MEMBER.getProfileImageUrl().getValue());
                softly.assertThat(response.email()).isEqualTo(REGISTERED_MEMBER.getEmail().getValue());
            });
        }

        @Test
        @DisplayName("존재하지 않는 사용자이메일로 조회시 실패한다.")
        void failWithNotRegisteredMember() {
            // given
            final Member NON_REGISTERED_MEMBER = ROY();

            // when & then
            assertThatThrownBy(() -> memberService.getMemberInformation(new MemberEmailDto(NON_REGISTERED_MEMBER.getEmail().getValue())))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("사용자 이름 수정 시")
    class updateMyInformation {

        @Test
        @DisplayName("사용자 정보 수정에 성공한다.")
        void successUpdateMyInfo() {
            // given
            final Member member = testFixtureBuilder.buildMember(ROY());
            final String nameToUpdate = "김덕우";

            // when
            final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(nameToUpdate);
            memberService.updateMemberInformation(memberUpdateRequest, new MemberEmailDto(member.getEmail().getValue()));

            // then
            assertSoftly(softly -> {
                softly.assertThat(member.getName().getValue()).isEqualTo(nameToUpdate);
                softly.assertThat(member.getEmail()).isEqualTo(ROY().getEmail());
                softly.assertThat(member.getProfileImageUrl()).isEqualTo(ROY().getProfileImageUrl());
            });
        }

        @Test
        @DisplayName("존재하지 않는 사용자 이메일로 정보 변경 요청 시 실패한다.")
        void failWithNotRegisteredMember() {
            // given
            final Member NON_REGISTERED_MEMBER = PHILIP();
            final String nameToUpdate = "김덕우";
            final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(nameToUpdate);

            // when & then
            assertThatThrownBy(() -> memberService.updateMemberInformation(memberUpdateRequest, new MemberEmailDto(NON_REGISTERED_MEMBER.getEmail().getValue())))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "   "})
        @DisplayName("변경할 사용자명이 빈 값일 경우 예외가 발생한다.")
        void failWithEmptyMemberNameToUpdate(final String memberNameToUpdate) {
            // given
            final Member member = testFixtureBuilder.buildMember(ROY());
            final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(memberNameToUpdate);

            // then
            assertThatThrownBy(() -> memberService.updateMemberInformation(memberUpdateRequest, new MemberEmailDto(member.getEmail().getValue())))
                    .isInstanceOf(MemberNameBlankException.class)
                    .hasMessage("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
        }

        @Test
        @DisplayName("변경할 사용자명이 20자를 초과할 경우 예외가 발생한다.")
        void failWithMemberNameToUpdate() {
            // given
            final Member member = testFixtureBuilder.buildMember(ROY());

            // when
            final String memberNameToUpdate = "a".repeat(21);
            final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(memberNameToUpdate);

            // then
            assertThatThrownBy(() -> memberService.updateMemberInformation(memberUpdateRequest, new MemberEmailDto(member.getEmail().getValue())))
                    .isInstanceOf(MemberNameLengthException.class)
                    .hasMessageContaining("멤버 이름의 길이가 최대 이름 길이를 초과했습니다.");
        }

        @Test
        @DisplayName("기존 사용자명이 DisplayName과 같을 경우 DisplayName도 변경된다.")
        void successWithUpdateDisplayName() {
            // given
            final Member member = testFixtureBuilder.buildMember(ROY());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace memberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
            final String nameToUpdate = "김덕우";

            // when
            final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(nameToUpdate);
            memberService.updateMemberInformation(memberUpdateRequest, new MemberEmailDto(member.getEmail().getValue()));

            // then
            assertSoftly(softly -> {
                softly.assertThat(member.getName().getValue()).isEqualTo(nameToUpdate);
                softly.assertThat(memberTeamPlace.getDisplayMemberName().getValue()).isEqualTo(nameToUpdate);
            });
        }

        @Test
        @DisplayName("기존 사용자명이 DisplayName과 다를 경우 DisplayName은 변경되지 않는다.")
        void successWithNonUpdateDisplayName() {
            // given
            final Member member = testFixtureBuilder.buildMember(ROY());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace memberTeamPlace = testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
            final String nameToUpdate = "김덕우";

            // when
            final String displayNameToChange = PHILIP_NAME;
            memberTeamPlace.changeDisplayMemberName(new DisplayMemberName(displayNameToChange));

            final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(nameToUpdate);
            memberService.updateMemberInformation(memberUpdateRequest, new MemberEmailDto(member.getEmail().getValue()));

            // then
            assertSoftly(softly -> {
                softly.assertThat(member.getName().getValue()).isEqualTo(nameToUpdate);
                softly.assertThat(memberTeamPlace.getDisplayMemberName().getValue()).isNotEqualTo(nameToUpdate);
                softly.assertThat(memberTeamPlace.getDisplayMemberName().getValue()).isEqualTo(displayNameToChange);
            });
        }
    }

    @Nested
    @DisplayName("사용자의 회원 탈퇴 시")
    class DeleteAccount {

        @Test
        @DisplayName("회원 탈퇴에 성공한다.")
        void success() {
            // given
            final Member REGISTERED_MEMBER = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());

            // when & then
            assertDoesNotThrow(() -> memberService.leaveMember(new MemberEmailDto(REGISTERED_MEMBER.getEmail().getValue())));
        }

        @Test
        @DisplayName("회원 탈퇴 이벤트가 발행된다.")
        void publishMemberLeaveEvent() {
            // given
            final Member REGISTERED_MEMBER = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());

            // when
            memberService.leaveMember(new MemberEmailDto(REGISTERED_MEMBER.getEmail().getValue()));

            // when & then
            assertThat(applicationEvents.stream(MemberLeaveEvent.class).count()).isEqualTo(1);
        }



        @Test
        @DisplayName("회원 탈퇴를 하면서 팀플레이스를 탈퇴한다.")
        void successWithMemberTeamPlace() {
            // given
            final Member REGISTERED_MEMBER = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(REGISTERED_MEMBER, ENGLISH_TEAM_PLACE);

            // when
            memberService.leaveMember(new MemberEmailDto(REGISTERED_MEMBER.getEmail().getValue()));

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(memberTeamPlaceRepository.findAllByMemberId(REGISTERED_MEMBER.getId())).isEmpty();
                softly.assertThat(memberRepository.existsByEmail(REGISTERED_MEMBER.getEmail())).isFalse();
            });
        }

        @Test
        @DisplayName("없는 회원은 탈퇴를 실패한다.")
        void failIfNotRegisteredMember() {
            // given
            final Member NON_REGISTERED_MEMBER = MemberFixtures.ROY();

            // when & then
            Assertions.assertThatThrownBy(() -> memberService.leaveMember(new MemberEmailDto(NON_REGISTERED_MEMBER.getEmail().getValue())))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }
    }
}
