package team.teamby.teambyteam.teamplace.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import team.teamby.teambyteam.common.RepositoryTest;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceInviteCodeFixtures.TEAM_PLACE_INVITE_CODE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TeamPlaceInviteCodeRepositoryTest extends RepositoryTest {

    @Autowired
    private TeamPlaceInviteCodeRepository teamPlaceInviteCodeRepository;

    @Test
    @DisplayName("팀플레이스 Id로 초대코드를 조회한다.")
    public void getTeamPlaceInviteCodeByTeamPlaceId() {
        //given
        final TeamPlace teamPlace = ENGLISH_TEAM_PLACE();
        final String inviteCode = String.valueOf(UUID.randomUUID());
        final TeamPlace buildTeamPlace = testFixtureBuilder.buildTeamPlace(teamPlace);
        testFixtureBuilder.buildTeamPlaceInviteCode(TEAM_PLACE_INVITE_CODE(inviteCode, teamPlace));

        //when
        final TeamPlaceInviteCode teamPlaceInviteCode = teamPlaceInviteCodeRepository.findByTeamPlaceId(buildTeamPlace.getId());

        //then
        assertThat(teamPlaceInviteCode.getCode()).isEqualTo(inviteCode);
    }
}
