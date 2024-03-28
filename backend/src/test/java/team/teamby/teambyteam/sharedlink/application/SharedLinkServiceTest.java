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
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinksResponse;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.SharedLinkRepository;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkNotFoundException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.SharedLinkFixtures.TEAM_BY_TEAM_LINK;

class SharedLinkServiceTest extends ServiceTest {

    @Autowired
    private SharedLinkService sharedLinkService;

    @Autowired
    private SharedLinkRepository sharedLinkRepository;

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

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
            final SharedLink sharedLink = TEAM_BY_TEAM_LINK(teamPlace.getId(), PHILIP.getId());
            final SharedLinkCreateRequest createRequest = new SharedLinkCreateRequest(sharedLink.getTitle().getValue(), sharedLink.getSharedURL().getValue());

            // when
            final Long created = sharedLinkService.create(memberEmailDto, teamPlace.getId(), createRequest);

            //then
            Optional<SharedLink> createdSharedLink = sharedLinkRepository.findById(created);
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(created).isNotNull();
                softly.assertThat(createdSharedLink).isNotEmpty();
                softly.assertThat(createdSharedLink.get().getTitle().getValue()).isEqualTo(sharedLink.getTitle().getValue());
                softly.assertThat(createdSharedLink.get().getSharedURL().getValue()).isEqualTo(sharedLink.getSharedURL().getValue());
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
            final String url = TEAM_BY_TEAM_LINK(teamPlace.getId(), PHILIP.getId()).getSharedURL().getValue();
            final SharedLinkCreateRequest createRequest = new SharedLinkCreateRequest(title, url);

            // when & then
            SoftAssertions.assertSoftly(softly ->
                    softly.assertThatThrownBy(() -> sharedLinkService.create(memberEmailDto, teamPlace.getId(), createRequest))
                            .isInstanceOf(SharedLinkException.TitleBlankException.class)
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
            final String title = TEAM_BY_TEAM_LINK(teamPlace.getId(), PHILIP.getId()).getSharedURL().getValue();
            final SharedLinkCreateRequest createRequest = new SharedLinkCreateRequest(title, url);

            // when & then
            SoftAssertions.assertSoftly(softly ->
                    softly.assertThatThrownBy(() -> sharedLinkService.create(memberEmailDto, teamPlace.getId(), createRequest))
                            .isInstanceOf(SharedLinkException.URLBlankException.class)
                            .hasMessage("공유 링크는 빈칸으로 구성될 수 없습니다.")
            );
        }
    }

    @Nested
    @DisplayName("공유링크 조회시")
    class GetSharedLinkTest {
        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final SharedLink sharedLink = TEAM_BY_TEAM_LINK(teamPlace.getId(), PHILIP.getId());
            testFixtureBuilder.buildSharedLink(sharedLink);
            testFixtureBuilder.buildSharedLink(new SharedLink(sharedLink.getTeamPlaceId(), sharedLink.getMemberId(), sharedLink.getTitle(), sharedLink.getSharedURL()));
            testFixtureBuilder.buildSharedLink(new SharedLink(sharedLink.getTeamPlaceId(), sharedLink.getMemberId(), sharedLink.getTitle(), sharedLink.getSharedURL()));

            // when
            final SharedLinksResponse sharedLinkResponses = sharedLinkService.getLinks(teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(sharedLinkResponses).isNotNull();
                softly.assertThat(sharedLinkResponses.teamLinks()).hasSize(3);
                softly.assertThat(sharedLinkResponses.teamLinks().get(0).memberName()).isEqualTo(memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlace.getId(), PHILIP.getId()).get().getDisplayMemberName().getValue());
                softly.assertThat(sharedLinkResponses.teamLinks().get(0).memberId()).isEqualTo(PHILIP.getId());
                softly.assertThat(sharedLinkResponses.teamLinks().get(0).title()).isEqualTo(sharedLink.getTitle().getValue());
                softly.assertThat(sharedLinkResponses.teamLinks().get(0).url()).isEqualTo(sharedLink.getSharedURL().getValue());
            });
        }

        @Test
        @DisplayName("내용이 없을 시 빈 리스트 조회에 성공한다.")
        void successEmptySize() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);

            // when
            final SharedLinksResponse sharedLinkResponses = sharedLinkService.getLinks(teamPlace.getId());

            //then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(sharedLinkResponses).isNotNull();
                softly.assertThat(sharedLinkResponses.teamLinks()).hasSize(0);
            });
        }
    }

    @Nested
    @DisplayName("공유링크 삭제시")
    class DeleteSharedLinkTest {
        @Test
        @DisplayName("삭제에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(TEAM_BY_TEAM_LINK(teamPlace.getId(), PHILIP.getId()));
            final int beforeSize = sharedLinkRepository.findAllByTeamPlaceId(teamPlace.getId()).size();

            // when
            sharedLinkService.deleteLink(teamPlace.getId(), sharedLink.getId());

            //then
            final int afterSize = sharedLinkRepository.findAllByTeamPlaceId(teamPlace.getId()).size();
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(beforeSize - 1).isEqualTo(afterSize);
            });
        }

        @Test
        @DisplayName("없는 경우에 실패한다.")
        void failIfNotFound() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final Long invalidSharedLinkId = -1L;

            // when & then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> sharedLinkService.deleteLink(teamPlace.getId(), invalidSharedLinkId))
                        .isInstanceOf(SharedLinkNotFoundException.class)
                        .hasMessageContaining("존재하지 않는 공유 링크입니다.");
            });
        }

        @Test
        @DisplayName("해당 팀플레이스의 공유링크가 아닌 경우 실패한다.")
        void failIfNotTeamPlace() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, teamPlace);
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(TEAM_BY_TEAM_LINK(teamPlace.getId(), PHILIP.getId()));
            final Long invalidTeamPlaceId = -1L;

            // when & then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThatThrownBy(() -> sharedLinkService.deleteLink(invalidTeamPlaceId, sharedLink.getId()))
                        .isInstanceOf(SharedLinkException.OwnerForbiddenException.class)
                        .hasMessageContaining("팀플레이스에 소속되지 않은 공유링크입니다.");
            });
        }
    }
}
