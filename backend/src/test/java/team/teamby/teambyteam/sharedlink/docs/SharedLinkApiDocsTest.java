package team.teamby.teambyteam.sharedlink.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.sharedlink.application.SharedLinkService;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkResponse;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinksResponse;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;
import team.teamby.teambyteam.sharedlink.presentation.SharedLinkController;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SharedLinkController.class)
public final class SharedLinkApiDocsTest extends ApiDocsTest {

    @MockBean
    private SharedLinkService sharedLinkService;

    @Nested
    @DisplayName("공유 링크 생성 문서화")
    class CreateSharedLink {

        @Test
        @DisplayName("공유링크 생성 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "url");
            final Long registeredId = 1L;
            given(sharedLinkService.create(any(), any(), any()))
                    .willReturn(registeredId);

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(sharedLinkCreateRequest)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string(HttpHeaders.LOCATION, "/api/team-place/" + teamPlaceId + "/team-links/" + registeredId))
                    .andDo(print())
                    .andDo(document("sharedLinks/create/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("생성할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("title").type(JsonFieldType.STRING).description("공유링크의 제목"),
                                            fieldWithPath("url").type(JsonFieldType.STRING).description("공유링크의 url")
                                    ),
                                    responseHeaders(
                                            headerWithName(HttpHeaders.LOCATION).description("create 후 location 헤더")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("공유 링크 제목이 빈칸이면 실패한다.")
        void failIfBlankTitle() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final String blankTitle = "";
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest(blankTitle, "url");

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(sharedLinkCreateRequest)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("sharedLinks/create/fail/blankTitle",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("생성할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("title").type(JsonFieldType.STRING).description("공유링크의 제목"),
                                            fieldWithPath("url").type(JsonFieldType.STRING).description("공유링크의 url")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("공유 링크 url이 빈칸이면 실패한다.")
        void failIfBlankURL() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final String url = "";
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", url);

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(sharedLinkCreateRequest)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("sharedLinks/create/fail/blankURL",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("생성할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("title").type(JsonFieldType.STRING).description("공유링크의 제목"),
                                            fieldWithPath("url").type(JsonFieldType.STRING).description("공유링크의 url")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 요청 시 실패한다.")
        void failIfNotAuthenticated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "url");
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException());

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(sharedLinkCreateRequest)))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("sharedLinks/create/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("생성할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("title").type(JsonFieldType.STRING).description("공유링크의 제목"),
                                            fieldWithPath("url").type(JsonFieldType.STRING).description("공유링크의 url")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("참여하지 않은 팀플레이스에 요청 시 실패한다.")
        void failIfNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final SharedLinkCreateRequest sharedLinkCreateRequest = new SharedLinkCreateRequest("title", "url");
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId,"사용자 email"));

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(sharedLinkCreateRequest)))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("sharedLinks/create/fail/notParticipated",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("생성할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("title").type(JsonFieldType.STRING).description("공유링크의 제목"),
                                            fieldWithPath("url").type(JsonFieldType.STRING).description("공유링크의 url")
                                    ),
                                    responseBody()
                            )
                    );
        }
    }

    @Nested
    @DisplayName("공유 링크 조회 문서화")
    class GetSharedLink {

        @Test
        @DisplayName("공유링크 조회 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final SharedLinkResponse sharedLinkResponse = new SharedLinkResponse(1L, "title", "url", 1L, "member", "updatedAt");
            final SharedLinksResponse sharedLinksResponse = SharedLinksResponse.of(List.of(sharedLinkResponse));
            given(sharedLinkService.getLinks(any()))
                    .willReturn(sharedLinksResponse);

            // when & then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("sharedLinks/get/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("조회할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 사용자면 실패한다.")
        void failIfUnAuthorized() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException());

            // when & then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("sharedLinks/get/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("조회할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("참여하지 않은 팀플레이스에 요청하면 실패한다.")
        void failIfNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId,"사용자 email"));

            // when & then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("sharedLinks/get/fail/notParticipated",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("조회할 공유링크의 팀플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }
    }

    @Nested
    @DisplayName("공유 링크 삭제 문서화")
    class DeleteSharedLink {

        @Test
        @DisplayName("공유링크 삭제 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long teamLinkId = 1L;

            // when & then
            mockMvc.perform(delete("/api/team-place/{teamPlaceId}/team-links/{teamLinkId}", teamPlaceId, teamLinkId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNoContent())
                    .andDo(print())
                    .andDo(document("sharedLinks/delete/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("삭제할 공유링크의 팀플레이스 ID"),
                                            parameterWithName("teamLinkId").description("삭제할 공유링크의 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("없는 공유 링크면 삭제에 실패한다.")
        void failIfNotFound() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long teamLinkId = 1L;
            doThrow(new SharedLinkException.NotFoundException(teamLinkId))
                    .when(sharedLinkService)
                    .deleteLink(any(), any());

            // when & then
            mockMvc.perform(delete("/api/team-place/{teamPlaceId}/team-links/{teamLinkId}", teamPlaceId, teamLinkId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("sharedLinks/delete/fail/notFound",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("삭제할 공유링크의 팀플레이스 ID"),
                                            parameterWithName("teamLinkId").description("삭제할 공유링크의 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 사용자면 실패한다.")
        void failIfUnAuthorized() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long teamLinkId = 1L;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException());

            // when & then
            mockMvc.perform(delete("/api/team-place/{teamPlaceId}/team-links/{teamLinkId}", teamPlaceId, teamLinkId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("sharedLinks/delete/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("삭제할 공유링크의 팀플레이스 ID"),
                                            parameterWithName("teamLinkId").description("삭제할 공유링크의 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("참여하지 않은 팀플레이스에 요청하면 실패한다.")
        void failIfNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long teamLinkId = 1L;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId,"사용자 email"));

            // when & then
            mockMvc.perform(delete("/api/team-place/{teamPlaceId}/team-links/{teamLinkId}", teamPlaceId, teamLinkId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("sharedLinks/delete/fail/notParticipated",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("삭제할 공유링크의 팀플레이스 ID"),
                                            parameterWithName("teamLinkId").description("삭제할 공유링크의 ID")
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
