package team.teamby.teambyteam.teamplace.application;

import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberIdAndDisplayNameOnly;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.domain.vo.Name;

import java.util.Optional;

class TeamPlaceServiceTest extends ServiceTest {

    @Autowired
    private TeamPlaceService teamPlaceService;

    @Autowired
    private TeamPlaceRepository teamPlaceRepository;

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Nested
    @DisplayName("팀플레이스 생성시")
    class CreateTeamPlaceTest {

        @Test
        @DisplayName("생성에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final String TEAM_PLACE_NAME = "새로운 팀플레이스";

            // when
            final TeamPlaceCreateResponse response = teamPlaceService.create(new MemberEmailDto(PHILIP.getEmail().getValue()), TEAM_PLACE_NAME);

            //then
            Optional<TeamPlace> createdTeamPlace = teamPlaceRepository.findById(response.teamPlaceId());
            Optional<MemberIdAndDisplayNameOnly> memberTeamPlace = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(response.teamPlaceId(), PHILIP.getId());
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.teamPlaceId()).isNotNull();
                softly.assertThat(createdTeamPlace).isNotEmpty();
                softly.assertThat(createdTeamPlace.get().getName()).isEqualTo(new Name(TEAM_PLACE_NAME));
                softly.assertThat(memberTeamPlace).isNotEmpty();
                softly.assertThat(memberTeamPlace.get().displayMemberName()).isEqualTo(new DisplayMemberName(PHILIP.getName().getValue()));
            });
        }

        @Test
        @DisplayName("존재하지 않는 사용자 아이디로 요청시 실패한다.")
        void failWithUnauthorizedEmail() {
            // given
            final Member PHILIP = MemberFixtures.PHILIP();
            final String TEAM_PLACE_NAME = "새로운 팀플레이스";

            // when & then
            Assertions.assertThatThrownBy(() -> teamPlaceService.create(new MemberEmailDto(PHILIP.getEmail().getValue()), TEAM_PLACE_NAME))
                    .isInstanceOf(MemberException.MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }
    }
}
