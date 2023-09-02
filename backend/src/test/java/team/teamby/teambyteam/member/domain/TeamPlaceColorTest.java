package team.teamby.teambyteam.member.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.member.exception.MemberTeamPlaceException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TeamPlaceColorTest {

    @Test
    @DisplayName("올바른 색상 번호로 해당 팀 플레이스 색상을 찾는다.")
    void findTeamPlaceColor() {
        // given
        final TeamPlaceColor teamPlaceColor = TeamPlaceColor.A;
        final int colorNumber = teamPlaceColor.getColorNumber();

        // when
        final TeamPlaceColor findTeamPlaceColor = TeamPlaceColor.findTeamPlaceColor(colorNumber);

        // then
        assertThat(findTeamPlaceColor).isEqualTo(teamPlaceColor);
    }

    @ParameterizedTest
    @ValueSource(ints = {-1, 10})
    @DisplayName("존재하지 않는 색상 번호로 해당 팀 플레이스 색상을 찾을 시 예외가 발생한다.")
    void failFindTeamPlaceColorWhenNotExistColorNumber(final int notExistColorNumber) {
        // when & then
        assertThatThrownBy(() -> TeamPlaceColor.findTeamPlaceColor(notExistColorNumber))
                .isInstanceOf(MemberTeamPlaceException.TeamPlaceColorNotExistException.class)
                .hasMessage(String.format("존재하지 않는 팀 플레이스 색상입니다. - request info { team_place_color : %d }", notExistColorNumber));
    }
}
