package team.teamby.teambyteam.member.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

class MemberTeamPlaceTest {


    @Test
    @DisplayName("멤버와 팀플레이스를 통해 멤버팀플레이스를 생성시 기본 이름으로 display name들이 설정된다.")
    void setDefaultDisplayName() {
        // given
        final Member philip = MemberFixtures.PHILIP();
        final TeamPlace japaneseTeamPlace = TeamPlaceFixtures.JAPANESE_TEAM_PLACE();
        final MemberTeamPlace memberTeamPlace = new MemberTeamPlace();

        // when
        memberTeamPlace.setMemberAndTeamPlace(philip, japaneseTeamPlace);

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(memberTeamPlace.getDisplayMemberName().getValue()).isEqualTo(philip.getName().getValue());
            softly.assertThat(memberTeamPlace.getDisplayTeamPlaceName().getValue()).isEqualTo(japaneseTeamPlace.getName().getValue());
        });
    }

}
