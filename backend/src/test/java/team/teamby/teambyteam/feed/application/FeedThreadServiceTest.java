package team.teamby.teambyteam.feed.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.HELLO_WRITING_REQUEST;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class FeedThreadServiceTest extends ServiceTest {

    @Autowired
    private FeedThreadService feedThreadService;

    @Nested
    @DisplayName("피드에 스레드 작성시")
    class WriteThread {

        @Test
        @DisplayName("피드에 스레드를 작성한다.")
        void writeThreadSuccess() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = HELLO_WRITING_REQUEST;

            // when
            final Long feedId = feedThreadService.write(request, new MemberEmailDto(author.getEmail().getValue()), teamPlace.getId());

            //then
            assertThat(feedId).isNotNull();
        }

        @Test
        @DisplayName("존재하지 않는 멤버로 요청을 보내게 되면 예외가 발생한다.")
        void failUnAuthorized() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = HELLO_WRITING_REQUEST;

            // when & then
            assertThatThrownBy(() -> feedThreadService.write(request, new MemberEmailDto(author.getEmail().getValue() + "x"), teamPlace.getId()))
                    .isInstanceOf(MemberException.MemberNotFoundException.class)
                    .hasMessage("조회한 멤버가 존재하지 않습니다.");
        }

    }

}
