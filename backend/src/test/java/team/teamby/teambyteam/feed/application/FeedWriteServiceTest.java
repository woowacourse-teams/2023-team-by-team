package team.teamby.teambyteam.feed.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.exception.FeedImageOverCountException;
import team.teamby.teambyteam.feed.exception.FeedImageSizeException;
import team.teamby.teambyteam.feed.exception.FeedNotAllowedImageExtensionException;
import team.teamby.teambyteam.feed.exception.FeedWritingRequestEmptyException;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.CONTENT_AND_IMAGE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.CONTENT_ONLY_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.EMPTY_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.IMAGE_ONLY_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.NOT_ALLOWED_IMAGE_EXTENSION_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.OVER_IMAGE_COUNT_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.OVER_IMAGE_SIZE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class FeedWriteServiceTest extends ServiceTest {

    @Autowired
    private FeedWriteService feedWriteService;

    @MockBean
    private FileStorageManager fileStorageManager;

    @Nested
    @DisplayName("피드에 스레드 작성시")
    class WriteThread {

        @BeforeEach
        void setup() {
            given(fileStorageManager.upload(any(MultipartFile.class), any(String.class), any(String.class)))
                    .willReturn("https://s3://seongha-seeik");
        }

        static Stream<FeedThreadWritingRequest> requests() {
            return Stream.of(
                    CONTENT_ONLY_REQUEST,
                    IMAGE_ONLY_REQUEST,
                    CONTENT_AND_IMAGE_REQUEST
            );
        }

        @ParameterizedTest
        @MethodSource("requests")
        @DisplayName("피드에 스레드를 작성한다.")
        void writeThreadSuccess(final FeedThreadWritingRequest request) {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            testFixtureBuilder.buildMemberTeamPlace(author, teamPlace);

            // when
            final Long feedId = feedWriteService.write(request, new MemberEmailDto(author.getEmail().getValue()),
                    teamPlace.getId());

            //then
            assertThat(feedId).isNotNull();
        }

        @Test
        @DisplayName("이미지 개수가 4개보다 많으면 예외가 발생한다.")
        void failWhenOverImageCount() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = OVER_IMAGE_COUNT_REQUEST;

            // when & then
            assertThatThrownBy(() -> feedWriteService.write(request, new MemberEmailDto(author.getEmail().getValue()),
                    teamPlace.getId()))
                    .isInstanceOf(FeedImageOverCountException.class)
                    .hasMessageContaining("허용된 이미지의 개수를 초과했습니다.");
        }

        @Test
        @DisplayName("이미지 크기가 허용된 크기보다 많으면 예외가 발생한다.")
        void failWhenOverImageSize() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = OVER_IMAGE_SIZE_REQUEST;

            // when & then
            assertThatThrownBy(() -> feedWriteService.write(request, new MemberEmailDto(author.getEmail().getValue()),
                    teamPlace.getId()))
                    .isInstanceOf(FeedImageSizeException.class)
                    .hasMessageContaining("허용된 이미지의 크기를 초과했습니다.");
        }

        @Test
        @DisplayName("이미지의 확장자가 허용되지 않은 확장자면 예외가 발생한다.")
        void failWhenNotAllowedImageExtension() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = NOT_ALLOWED_IMAGE_EXTENSION_REQUEST;

            // when & then
            assertThatThrownBy(() -> feedWriteService.write(request, new MemberEmailDto(author.getEmail().getValue()),
                    teamPlace.getId()))
                    .isInstanceOf(FeedNotAllowedImageExtensionException.class)
                    .hasMessageContaining("허용되지 않은 확장자입니다.");
        }

        @Test
        @DisplayName("내용과 이미지가 모두 존재하지 않으면 예외가 발생한다.")
        void failWhenContentAndImageNotExist() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = EMPTY_REQUEST;

            // when & then
            assertThatThrownBy(() -> feedWriteService.write(request, new MemberEmailDto(author.getEmail().getValue()),
                    teamPlace.getId()))
                    .isInstanceOf(FeedWritingRequestEmptyException.class)
                    .hasMessageContaining("내용과 이미지가 모두 존재하지 않습니다.");
        }

        @Test
        @DisplayName("존재하지 않는 멤버로 요청을 보내게 되면 예외가 발생한다.")
        void failUnAuthorized() {
            // given
            final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Member author = testFixtureBuilder.buildMember(PHILIP());
            final FeedThreadWritingRequest request = CONTENT_AND_IMAGE_REQUEST;

            // when & then
            assertThatThrownBy(
                    () -> feedWriteService.write(request, new MemberEmailDto(author.getEmail().getValue() + "x"),
                            teamPlace.getId()))
                    .isInstanceOf(MemberNotFoundException.class)
                    .hasMessageContaining("조회한 멤버가 존재하지 않습니다.");
        }
    }
}
