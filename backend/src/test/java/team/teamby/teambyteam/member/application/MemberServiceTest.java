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
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

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

}