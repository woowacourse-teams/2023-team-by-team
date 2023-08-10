package team.teamby.teambyteam.member.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.application.dto.TeamPlaceResponse;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeException;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceInviteCodeFixtures.TEAM_PLACE_INVITE_CODE;

class MemberServiceTest extends ServiceTest {

    @Autowired
    private MemberService memberService;

    @Nested
    @DisplayName("사용자가 속한 팀플레이스들의 정보 조회시")
    class FindAllParticipatedTeamPlaceInfo {

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final Member ENDEL = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.JAPANESE_TEAM_PLACE());
            final TeamPlace STATICS_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.STATICS_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(ENDEL, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(ENDEL, STATICS_TEAM_PLACE);

            // when
            final TeamPlacesResponse response = memberService.getParticipatedTeamPlaces(new MemberEmailDto(ENDEL.getEmail().getValue()));

            //then
            final List<TeamPlaceResponse> teamPlaceResponses = response.teamPlaces();
            SoftAssertions.assertSoftly(softly -> {
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
    @DisplayName("멤버가 초대코드로 팀플레이스 참여")
    class ParticipateTeamPlaceByInviteCode {

        @Test
        @DisplayName("참여에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));

            // when
            final TeamPlaceParticipantResponse response = memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), inviteCode);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(PHILIP.isMemberOf(ENGLISH_TEAM_PLACE.getId())).isTrue();
                softly.assertThat(response.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("중복 참여의 경우 계속 동일한 TeamPlaceParticipantResponse를 반환한다.")
        void ifDuplicateRequest() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), inviteCode);

            // when
            final TeamPlaceParticipantResponse response = memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), inviteCode);

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(PHILIP.isMemberOf(ENGLISH_TEAM_PLACE.getId())).isTrue();
                softly.assertThat(response.teamPlaceId()).isEqualTo(ENGLISH_TEAM_PLACE.getId());
            });
        }

        @Test
        @DisplayName("존재하지 않는 사용자의 경우 예외가 발생한다.")
        void failIfNotExistsMember() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String inviteCode = "aaaaaaaa";
            testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(new InviteCode(inviteCode), ENGLISH_TEAM_PLACE));
            final String invalidEmail = "email@email.com";

            // when & then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> memberService.participateTeamPlace(new MemberEmailDto(invalidEmail), inviteCode))
                        .isInstanceOf(MemberException.MemberNotFoundException.class)
                        .hasMessage("조회한 멤버가 존재하지 않습니다.");
            });
        }

        @Test
        @DisplayName("존재하지 않는 참여코드의 경우 예외가 발생한다.")
        void failIfNotExistsInviteCode() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            final String invalidInviteCode = "aaaaaaaa";

            // when & then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> memberService.participateTeamPlace(new MemberEmailDto(PHILIP.getEmail().getValue()), invalidInviteCode))
                        .isInstanceOf(TeamPlaceInviteCodeException.NotFoundException.class)
                        .hasMessage("존재하지 않는 초대코드 입니다.");
            });
        }
    }
}
