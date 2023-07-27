package team.teamby.teambyteam.teamplace.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class TeamPlaceRepositoryTest extends RepositoryTest {

    @Autowired
    private TeamPlaceRepository teamPlaceRepository;

    @ParameterizedTest
    @CsvSource(value = {"-1:false", "1:true"}, delimiter = ':')
    @DisplayName("id에 해당하는 팀 플레이스가 존재하면 true, 존재하지 않으면 false를 반환한다.")
    void isExistById(Long teamPlaceId, boolean expected) {
        // given
        testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

        // when
        final boolean actual = teamPlaceRepository.existsById(teamPlaceId);

        // then
        assertThat(actual).isEqualTo(expected);
    }
}
