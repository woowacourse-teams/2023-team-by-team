package team.teamby.teambyteam.feed.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.CONTENT_AND_IMAGE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.FeedThreadFixtures.CONTENT_ONLY_REQUEST;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.feed.domain.cache.InMemoryRecentFeedCache.MAX_CACHE_FEED_SIZE;

class FeedThreadWithCacheServiceTest extends ServiceTest {

    @SpyBean
    private FeedRepository feedRepository;

    @MockBean
    private FileCloudUploader fileCloudUploader;

    @Autowired
    private FeedThreadService feedThreadService;

    @BeforeEach
    void setup() {
        given(fileCloudUploader.upload(any(MultipartFile.class), any(String.class), any(String.class)))
                .willReturn("https://s3://seongha-seeik");
    }

    @Test
    @DisplayName("캐시에서 정보를 가져온다.")
    void readFromCache() {
        final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Member author = testFixtureBuilder.buildMember(PHILIP());
        testFixtureBuilder.buildMemberTeamPlace(author, teamPlace);

        // when
        final MemberEmailDto memberEmailDto = new MemberEmailDto(author.getEmail().getValue());
        feedThreadService.write(CONTENT_ONLY_REQUEST, memberEmailDto, teamPlace.getId());
        feedThreadService.write(CONTENT_AND_IMAGE_REQUEST, memberEmailDto, teamPlace.getId());

        feedThreadService.firstRead(teamPlace.getId(), memberEmailDto, 2);

        // then
        verify(feedRepository, never()).findByTeamPlaceId(any(), any());
    }

    @Test
    @DisplayName("db에서 정보를 가져온다.")
    void readFromDb() {
        final TeamPlace teamPlace = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Member author = testFixtureBuilder.buildMember(PHILIP());
        testFixtureBuilder.buildMemberTeamPlace(author, teamPlace);

        // when
        final MemberEmailDto memberEmailDto = new MemberEmailDto(author.getEmail().getValue());
        feedThreadService.write(CONTENT_ONLY_REQUEST, memberEmailDto, teamPlace.getId());
        feedThreadService.write(CONTENT_AND_IMAGE_REQUEST, memberEmailDto, teamPlace.getId());

        feedThreadService.firstRead(teamPlace.getId(), memberEmailDto, MAX_CACHE_FEED_SIZE + 1);

        // then
        verify(feedRepository, times(1)).findByTeamPlaceId(any(), any());
    }
}
