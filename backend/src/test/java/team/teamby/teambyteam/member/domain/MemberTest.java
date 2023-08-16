package team.teamby.teambyteam.member.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.vo.Name;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.A;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.B;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.C;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.D;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.E;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.F;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.G;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.H;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.I;
import static team.teamby.teambyteam.member.domain.TeamPlaceColor.J;

class MemberTest {

    @Nested
    @DisplayName("팀플레이스에 참여한다.")
    class ParticipateTest {

        @Test
        @DisplayName("팀플레이스에 등록될 때 색상이 순서대로 들어간다.")
        void setTeamPlaceColor() {
            // given
            final Member philip = MemberFixtures.PHILIP();
            final TeamPlace englishTeamPlace = TeamPlaceFixtures.ENGLISH_TEAM_PLACE();
            final TeamPlace japaneseTeamPlace = TeamPlaceFixtures.JAPANESE_TEAM_PLACE();
            final TeamPlace fluidTeamPlace = TeamPlaceFixtures.FLUID_TEAM_PLACE();

            // when
            philip.participate(englishTeamPlace);
            philip.participate(japaneseTeamPlace);
            philip.participate(fluidTeamPlace);

            //then
            final List<TeamPlaceColor> actualTeamPlaceColors = philip.getMemberTeamPlaces().stream()
                    .map(MemberTeamPlace::getTeamPlaceColor)
                    .toList();
            assertThat(actualTeamPlaceColors).containsExactly(A, B, C);
        }

        @Test
        @DisplayName("정해진 색상코드 수 이상의 팀플레이스에 가입되면 중복을 허용하며 가장 적은 수로 사용된 색상을 배정한다.")
        void setMinUsedColorIfAllColorsAreUsedFor() {
            // given
            final Member roy = MemberFixtures.ROY();

            // when
            for (int i = 0; i < TeamPlaceColor.values().length * 2; i++) {
                roy.participate(new TeamPlace(new Name(String.valueOf(i))));
            }

            //then
            final List<TeamPlaceColor> actualTeamColors = roy.getMemberTeamPlaces()
                    .stream()
                    .map(MemberTeamPlace::getTeamPlaceColor)
                    .toList();
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(actualTeamColors.stream().filter(color -> color == A).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == B).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == C).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == D).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == E).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == F).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == G).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == H).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == I).count()).isEqualTo(2);
                softly.assertThat(actualTeamColors.stream().filter(color -> color == J).count()).isEqualTo(2);
            });
        }
    }
}
