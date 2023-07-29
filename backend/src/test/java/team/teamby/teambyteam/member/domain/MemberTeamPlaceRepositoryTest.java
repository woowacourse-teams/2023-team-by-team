package team.teamby.teambyteam.member.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

class MemberTeamPlaceRepositoryTest extends RepositoryTest {

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Test
    @DisplayName("멤버아이디와 소속된 팀의 아이디로 해당 팀에서의 사용자 이름을 조회한다.")
    void findMemberIdAndDisplayNameByTeamPlaceIdAndMemberId() {
        // given
        final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
        testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);

        // when
        final MemberIdAndDisplayNameOnly actual = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(ENGLISH_TEAM_PLACE.getId(), PHILIP.getId()).get();

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(actual.id()).isEqualTo(PHILIP.getId());
            softly.assertThat(actual.displayMemberName().getValue()).isEqualTo(PHILIP.getName().getValue());
        });
    }

    @Test
    @DisplayName("팀플레이스에 소속된 모든 멤버들의 아이디와 해당 팀에서의 사용자 이름을 조회한다.")
    void findAllMemberIdAndDisplayNameByTeamPlace() {
        // given
        final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
        final Member ENDLE = testFixtureBuilder.buildMember(MemberFixtures.ENDEL());
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
        testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
        testFixtureBuilder.buildMemberTeamPlace(ENDLE, ENGLISH_TEAM_PLACE);

        // when
        final List<MemberIdAndDisplayNameOnly> actual = memberTeamPlaceRepository.findAllByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());
        final List<String> displayNames = actual.stream()
                .map(MemberIdAndDisplayNameOnly::displayMemberName)
                .map(DisplayMemberName::getValue)
                .toList();

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(actual).hasSize(2);
            softly.assertThat(displayNames).containsExactlyInAnyOrder(PHILIP.getName().getValue(), ENDLE.getName().getValue());
        });
    }

}
