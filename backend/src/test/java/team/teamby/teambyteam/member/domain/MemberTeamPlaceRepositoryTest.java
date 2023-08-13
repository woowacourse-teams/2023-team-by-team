package team.teamby.teambyteam.member.domain;

import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ENDEL;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.SEONGHA;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class MemberTeamPlaceRepositoryTest extends RepositoryTest {

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Test
    @DisplayName("멤버아이디와 소속된 팀의 아이디로 해당 팀에서의 사용자 정보를 조회한다.")
    void findMemberIdAndDisplayNameByTeamPlaceIdAndMemberId() {
        // given
        final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
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

    @Test
    @DisplayName("팀 플레이스 ID로 해당 팀에서의 사용자 정보를 조회한다.")
    void findAllByTeamPlaceId() {
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

        final List<MemberTeamPlace> expected =
                List.of(memberTeamPlace1, memberTeamPlace2, memberTeamPlace3, memberTeamPlace4);

        // when
        final List<MemberTeamPlace> actual = memberTeamPlaceRepository.findAllByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());

        //then
        Assertions.assertThat(actual).usingRecursiveFieldByFieldElementComparator()
                .isEqualTo(expected);
    }
}
