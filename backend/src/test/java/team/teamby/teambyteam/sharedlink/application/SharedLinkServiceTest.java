package team.teamby.teambyteam.sharedlink.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.SharedLinkRepository;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.Optional;

class SharedLinkServiceTest extends ServiceTest {

    @Autowired
    private SharedLinkService sharedLinkService;

    @Autowired
    private SharedLinkRepository sharedLinkRepository;

    @Nested
    @DisplayName("공유링크 생성시")
    class CreateSharedLinkTest {

        @Test
        @DisplayName("생성에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final MemberEmailDto memberEmailDto = new MemberEmailDto(PHILIP.getEmail().getValue());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final String title = "자료";
            final String url = "/";
            final SharedLinkCreateRequest createRequest = new SharedLinkCreateRequest(title, url);

            // when
            final Long created = sharedLinkService.create(memberEmailDto, teamPlace.getId(), createRequest);

            //then
            Optional<SharedLink> createdSharedLink = sharedLinkRepository.findById(created);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(created).isNotNull();
                softly.assertThat(createdSharedLink).isNotEmpty();
                softly.assertThat(createdSharedLink.get().getTitle().getValue()).isEqualTo(title);
                softly.assertThat(createdSharedLink.get().getSharedURL().getValue()).isEqualTo(url);
                softly.assertThat(createdSharedLink.get().getMemberId()).isEqualTo(PHILIP.getId());
                softly.assertThat(createdSharedLink.get().getTeamPlaceId()).isEqualTo(teamPlace.getId());
            });
        }

        @ParameterizedTest
        @DisplayName("빈 제목으로 생성 시 실패한다..")
        @ValueSource(strings = {"", " ", "          "})
        void failBlankTitle(final String title) {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final MemberEmailDto memberEmailDto = new MemberEmailDto(PHILIP.getEmail().getValue());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final String url = "/";
            final SharedLinkCreateRequest createRequest = new SharedLinkCreateRequest(title, url);

            // when & then
            SoftAssertions.assertSoftly(softly ->
                    softly.assertThatThrownBy(() -> sharedLinkService.create(memberEmailDto, teamPlace.getId(), createRequest))
                            .isInstanceOf(SharedLinkException.TitleException.class)
                            .hasMessage("공유 링크의 제목은 빈칸으로 구성될 수 없습니다.")
            );
        }

        @ParameterizedTest
        @DisplayName("빈 url로 생성 시 실패한다.")
        @ValueSource(strings = {"", " ", "          "})
        void failBlankURL(final String url) {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final MemberEmailDto memberEmailDto = new MemberEmailDto(PHILIP.getEmail().getValue());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final String title = "title";
            final SharedLinkCreateRequest createRequest = new SharedLinkCreateRequest(title, url);

            // when & then
            SoftAssertions.assertSoftly(softly ->
                    softly.assertThatThrownBy(() -> sharedLinkService.create(memberEmailDto, teamPlace.getId(), createRequest))
                            .isInstanceOf(SharedLinkException.URLException.class)
                            .hasMessage("공유 링크는 빈칸으로 구성될 수 없습니다.")
            );
        }
    }
}
