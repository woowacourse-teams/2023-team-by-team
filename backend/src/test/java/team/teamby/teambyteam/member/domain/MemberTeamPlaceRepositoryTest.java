package team.teamby.teambyteam.member.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

class MemberTeamPlaceRepositoryTest extends RepositoryTest {

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Test
    @DisplayName("멤버아이디와 소속된 팀의 아이디로 해당 팀에서의 사용자 정보를 조회한다.")
    void findMemberIdAndDisplayNameByTeamPlaceIdAndMemberId() {
        // given
        final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
        testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);

        // when
        final MemberTeamPlace actual = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(ENGLISH_TEAM_PLACE.getId(), PHILIP.getId()).get();

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(actual.getMember().getId()).isEqualTo(PHILIP.getId());
            softly.assertThat(actual.getDisplayMemberName().getValue()).isEqualTo(PHILIP.getName().getValue());
            softly.assertThat(actual.getDisplayTeamPlaceName().getValue()).isEqualTo(ENGLISH_TEAM_PLACE.getName().getValue());
        });
    }
}
