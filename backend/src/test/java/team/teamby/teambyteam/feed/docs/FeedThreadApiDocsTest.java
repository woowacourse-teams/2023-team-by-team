package team.teamby.teambyteam.feed.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.common.fixtures.FeedThreadFixtures;
import team.teamby.teambyteam.feed.application.FeedThreadService;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.presentation.FeedThreadController;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseBody;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FeedThreadController.class)
public final class FeedThreadApiDocsTest extends ApiDocsTest {

    @MockBean
    private FeedThreadService feedThreadService;

    @Nested
    @DisplayName("스레드 등록 문서화")
    class FeedThreadWriteDocs {

        @Test
        @DisplayName("스레드 등록 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final FeedThreadWritingRequest request = FeedThreadFixtures.CONTENT_AND_IMAGE_REQUEST;
            final Long registeredId = 1L;
            given(feedThreadService.write(any(), any(), any()))
                    .willReturn(registeredId);

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string(HttpHeaders.LOCATION, "/api/team-place/" + teamPlaceId + "/feed/threads/" + registeredId))
                    .andDo(print())
                    .andDo(document("feeds/write/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("등록할 내용"),
                                            fieldWithPath("images").type(JsonFieldType.ARRAY).description("등록할 이미지들")
                                    ),
                                    responseHeaders(
                                            headerWithName(HttpHeaders.LOCATION).description("create 후 location 헤더")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("내용과 이미지가 빈 값이면 요청 시 실패")
        void failIfEmptyContentAndImages() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final FeedThreadWritingRequest request = FeedThreadFixtures.EMPTY_REQUEST;

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("feeds/write/fail/emptyContentAndImages",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("빈 content"),
                                            fieldWithPath("images").type(JsonFieldType.ARRAY).description("빈 이미지")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("참가하지 않은 팀플레이스로 요청 시 실패")
        void failIfNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final FeedThreadWritingRequest request = FeedThreadFixtures.CONTENT_AND_IMAGE_REQUEST;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId, "사용자 email"));

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("feeds/write/fail/notParticipatedTeamPlace",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("등록할 내용")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 요청 시 실패")
        void failIfNotAuthenticated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final FeedThreadWritingRequest request = FeedThreadFixtures.CONTENT_AND_IMAGE_REQUEST;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("feeds/write/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("등록할 내용")
                                    )
                            )
                    );
        }
    }

    @Nested
    @DisplayName("스레드 조회 문서화")
    class FeedThreadReadDocs {

        @Test
        @DisplayName("스레드 처음 조회 성공")
        void firstRead() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final int size = 3;
            final Long authorId = 1L;

            FeedResponse feedResponse = new FeedResponse(1L, FeedType.THREAD.name(), authorId, "author", "/", "created", "hello", List.of(), false);
            final FeedsResponse feedsResponse = new FeedsResponse(List.of(feedResponse));
            given(feedThreadService.firstRead(any(), any(), any()))
                    .willReturn(feedsResponse);

            // when & then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .param("size", String.valueOf(size)))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("feeds/read/first/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    queryParameters(
                                            parameterWithName("size").description("요청할 최신 피드의 개수")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ), responseBody(
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 사용자는 조회를 실패한다.")
        void readFailUnAuthenticated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final int size = 3;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .param("size", String.valueOf(size)))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("feeds/read/first/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    queryParameters(
                                            parameterWithName("size").description("요청할 최신 피드의 개수")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ), responseBody(
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("참여하지 않은 팀플레이스의 조회를 실패한다.")
        void failNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final int size = 3;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId, "사용자 email"));

            // when & then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .param("size", String.valueOf(size)))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("feeds/read/first/fail/notParticipated",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    queryParameters(
                                            parameterWithName("size").description("요청할 최신 피드의 개수")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ), responseBody(
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("스레드 재조회 성공")
        void reRead() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long lastThreadId = 5L;
            final int size = 3;
            final Long authorId = 1L;


            final FeedResponse feedResponse = new FeedResponse(1L, FeedType.THREAD.name(), authorId, "author", "/", "created", "hello", List.of(), false);
            final FeedsResponse feedsResponse = new FeedsResponse(List.of(feedResponse));
            given(feedThreadService.reRead(any(), any(), any(), any()))
                    .willReturn(feedsResponse);

            // when & then
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("size", String.valueOf(size));
            params.add("last-thread-id", String.valueOf(lastThreadId));
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .params(params))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("feeds/read/repeat/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    queryParameters(
                                            parameterWithName("size").description("요청할 최신 피드의 개수"),
                                            parameterWithName("last-thread-id").description("이전 요청의 마지막 피드 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않으면 재조회를 실패한다.")
        void reReadFailUnAuthenticated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long lastThreadId = 5L;
            final int size = 3;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("size", String.valueOf(size));
            params.add("last-thread-id", String.valueOf(lastThreadId));
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .params(params))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("feeds/read/repeat/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    queryParameters(
                                            parameterWithName("size").description("요청할 최신 피드의 개수"),
                                            parameterWithName("last-thread-id").description("이전 요청의 마지막 피드 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("참여하지 않은 팀플레이스의 재조회를 실패한다.")
        void reReadFailNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long lastThreadId = 5L;
            final int size = 3;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId, "사용자 email"));

            // when & then
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("size", String.valueOf(size));
            params.add("last-thread-id", String.valueOf(lastThreadId));
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/feed/threads", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .params(params))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("feeds/read/repeat/fail/notParticipated",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    queryParameters(
                                            parameterWithName("size").description("요청할 최신 피드의 개수"),
                                            parameterWithName("last-thread-id").description("이전 요청의 마지막 피드 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }
    }
}
