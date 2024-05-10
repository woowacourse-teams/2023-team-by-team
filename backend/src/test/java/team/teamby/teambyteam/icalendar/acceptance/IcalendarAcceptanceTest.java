package team.teamby.teambyteam.icalendar.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.common.fixtures.PublishedIcalendarFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.concurrent.CountDownLatch;

import static org.mockito.ArgumentMatchers.any;
import static team.teamby.teambyteam.common.fixtures.acceptance.IcalendarAcceptanceFixtures.GET_ICALENDAR_PUBLISHED_URL;

public class IcalendarAcceptanceTest extends AcceptanceTest {

    @MockBean
    private FileStorageManager fileStorageManager;

    @Autowired
    private TestConfig.AsyncAspect asyncAspect;

    @TestConfiguration
    static class TestConfig {

        @Aspect
        @Component
        static class AsyncAspect {

            private CountDownLatch countDownLatch;

            public void init() {
                countDownLatch = new CountDownLatch(1);
            }

            @After("execution(* team.teamby.teambyteam.icalendar.application.IcalendarPublishService.updateIcalendar(*))")
            public void afterIcalendarCreation() {
                countDownLatch.countDown();
            }

            public void await() throws InterruptedException {
                countDownLatch.await();
                Thread.sleep(10);
            }
        }
    }

    @Nested
    @DisplayName("icalendar 배포 파일 조회시")
    public class IcalendarUrlGetTest {

        private Member member;
        private TeamPlace teamPlace;
        private String authCode;

        @BeforeEach
        void setup() {
            member = testFixtureBuilder.buildMember(MemberFixtures.PHILIP());
            teamPlace = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.FLUID_TEAM_PLACE());
            testFixtureBuilder.buildMemberTeamPlace(member, teamPlace);
            authCode = jwtTokenProvider.generateAccessToken(member.getEmailValue());
        }

        @Test
        @DisplayName("조회에 성공한다.")
        void success() {
            // given
            final PublishedIcalendar publishedIcalendar = testFixtureBuilder.buildPublishedIcalendar(PublishedIcalendarFixtures.TEST_ICALENDAR(teamPlace.getId()));

            // when
            final ExtractableResponse<Response> response = GET_ICALENDAR_PUBLISHED_URL(authCode, teamPlace.getId());

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(response.jsonPath().getString("url")).isEqualTo(publishedIcalendar.getPublishUrlValue());
            });
        }

        @Test
        @DisplayName("아직 생성되지 않았으면 404예외가 발생된 후 생성이 된다.")
        void failWhenNotPublished() throws InterruptedException {
            // given
            final String generatedUrl = "https://assets.test.teamby.team/asset/path/icalendar.ics";
            BDDMockito.given(fileStorageManager.upload(any(byte[].class), any(String.class), any(String.class)))
                    .willAnswer(invocation -> generatedUrl);

            // when
            asyncAspect.init();
            final ExtractableResponse<Response> firstResponse = GET_ICALENDAR_PUBLISHED_URL(authCode, teamPlace.getId());
            asyncAspect.await();

            final ExtractableResponse<Response> secondResponse = GET_ICALENDAR_PUBLISHED_URL(authCode, teamPlace.getId());

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(firstResponse.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(secondResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(secondResponse.jsonPath().getString("url")).isEqualTo(generatedUrl);
            });
        }
    }
}
