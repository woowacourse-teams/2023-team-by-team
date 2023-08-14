package team.teamby.teambyteam.notice.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.notice.application.NoticeService;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.presentation.NoticeController;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.FIRST_NOTICE_REGISTER_REQUEST;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_2ND;

@WebMvcTest(NoticeController.class)
public class NoticeApiDocsTest extends ApiDocsTest {

    public static final String POST_REQUEST_URL = "/api/team-place/{teamPlaceId}/feed/notice";
    public static final String GET_REQUEST_URL = "/api/team-place/{teamPlaceId}/feed/notice/recent";
    @MockBean
    private NoticeService noticeService;

    @Nested
    @DisplayName("공지 등록 문서화")
    class RegisterNoticeDocs {

        @Test
        @DisplayName("공지 등록 성공")
        void successRegisterNotice() throws Exception {
            //given
            final Long teamPlaceId = 1L;
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;
            final Long registeredId = 1L;

            given(noticeService.register(eq(request), eq(teamPlaceId), any()))
                    .willReturn(registeredId);

            // when & then
            mockMvc.perform(post(POST_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string(HttpHeaders.LOCATION, "/api/team-place/" + teamPlaceId + "/feed/threads/notice/" + registeredId))
                    .andDo(print())
                    .andDo(document("notice/register/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("등록할 공지 내용")
                                    ),
                                    responseHeaders(
                                            headerWithName(HttpHeaders.LOCATION).description("공지 등록 후 Location 헤더")
                                    )
                            )
                    );
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "  "})
        @DisplayName("공지 내용 요청 값으로 빈 내용이 들어오면 실패")
        void failWithBlankContent(final String content) throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final NoticeRegisterRequest request = new NoticeRegisterRequest(content);

            // when & then
            mockMvc.perform(post(POST_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("notice/register/fail/blankContent",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("빈 content")
                                    )
                            )
                    );
        }


        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 아이디로 요청 시 등록에 실패")
        void failWithForbiddenTeamPlace() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(TeamPlaceException.TeamPlaceAccessForbidden.class);


            // when & then
            mockMvc.perform(post(POST_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("notice/register/fail/forbiddenTeamPlace",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").description("등록할 공지 내용")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("존재하지 않는 팀플레이스 아이디로 요청 시 등록에 실패")
        void failWithNonExistTeamPlace() throws Exception {
            // given
            final Long nonExistTeamPlaceId = -1L;
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;
            given(noticeService.register(eq(request), eq(nonExistTeamPlaceId), any()))
                    .willThrow(TeamPlaceException.TeamPlaceAccessForbidden.class);

            // when & then
            mockMvc.perform(post(POST_REQUEST_URL, nonExistTeamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("notice/register/fail/nonExistTeamPlace",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("존재하지 않는 팀플레이스 ID")

                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").description("등록할 공지 내용")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("존재하지 않는 사용자로 요청시 등록에 실패")
        void failWithUnauthorizedMember() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final NoticeRegisterRequest request = FIRST_NOTICE_REGISTER_REQUEST;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(MemberException.MemberNotFoundException.class);

            // when & then
            mockMvc.perform(post(POST_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("notice/register/fail/nonExistMember",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("content").description("등록할 공지 내용")
                                    )
                            )
                    );
        }
    }

    @Nested
    @DisplayName("공지 조회 시")
    class FindNotice {

        @Test
        @DisplayName("가장 최근에 등록한 공지가 조회")
        void successFindingNotice() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Member roy = spy(ROY());
            when(roy.getId()).thenReturn(1L);
            final Notice notice2nd = spy(NOTICE_2ND(teamPlaceId, roy.getId()));
            when(notice2nd.getId()).thenReturn(2L);

            final Optional<NoticeResponse> response = Optional.of(new NoticeResponse(
                    notice2nd.getId(),
                    notice2nd.getContent().getValue(),
                    roy.getId(),
                    roy.getName().getValue(),
                    roy.getProfileImageUrl().getValue(),
                    "2023-01-01 00:00"));

            given(noticeService.findMostRecentNotice(teamPlaceId))
                    .willReturn(response);

            // when & then
            mockMvc.perform(get(GET_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("notice/find/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseFields(
                                            fieldWithPath("id").type(JsonFieldType.NUMBER).description("조회한 공지 Id"),
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("조회한 공지 내용"),
                                            fieldWithPath("authorId").type(JsonFieldType.NUMBER).description("공지를 등록한 멤버 Id"),
                                            fieldWithPath("authorName").type(JsonFieldType.STRING).description("공지를 등록한 멤버 이름"),
                                            fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("공지를 등록한 멤버 이미지"),
                                            fieldWithPath("createdAt").type(JsonFieldType.STRING).description("공지를 등록한 날짜")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("팀플레이스에 등록 된 공지가 없을 경우 빈 값이 반환")
        void successFindingEmptyNotice() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Optional<NoticeResponse> response = Optional.empty();

            given(noticeService.findMostRecentNotice(teamPlaceId))
                    .willReturn(response);

            // when & then
            mockMvc.perform(get(GET_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("notice/find/success/nonExistNotice",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("팀플레이스를 나가거나 탈퇴한 사용자가 작성한 공지를 조회")
        void getNoticeWrittenByLeavedMember() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Long authorId = 1L;
            final Notice notice2nd = spy(NOTICE_2ND(teamPlaceId, authorId));

            when(notice2nd.getId()).thenReturn(2L);

            final Optional<NoticeResponse> response = Optional.of(new NoticeResponse(
                    1L,
                    notice2nd.getContent().getValue(),
                    null,
                    "(알수없음)",
                    "unknown@teamby.team",
                    "2022-01-01 00:00"));

            given(noticeService.findMostRecentNotice(teamPlaceId))
                    .willReturn(response);

            // when & then
            mockMvc.perform(get(GET_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("notice/find/success/writtenByLeavedMember",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseFields(
                                            fieldWithPath("id").type(JsonFieldType.NUMBER).description("조회한 공지 Id"),
                                            fieldWithPath("content").type(JsonFieldType.STRING).description("조회한 공지 내용"),
                                            fieldWithPath("authorId").type(JsonFieldType.NULL).description("탈퇴하여 확인할 수 없는 멤버Id"),
                                            fieldWithPath("authorName").type(JsonFieldType.STRING).description("탈퇴하여 확인할 수 없는 멤버 이름"),
                                            fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("탈퇴하여 확인할 수 없는 멤버 프로필"),
                                            fieldWithPath("createdAt").type(JsonFieldType.STRING).description("공지를 등록한 날짜")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("존재하지 않는 팀플레이스로 공지 조회 요청 시 예외 발생")
        void failWithNonExistTeamPlace() throws Exception {
            // given
            final Long nonExistTeamPlaceId = -1L;

            given(noticeService.findMostRecentNotice(nonExistTeamPlaceId))
                    .willThrow(TeamPlaceException.TeamPlaceAccessForbidden.class);

            // when & then
            mockMvc.perform(get(GET_REQUEST_URL, nonExistTeamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("notice/find/fail/NonExistTeamPlaceId",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 Id로 공지 조회 요청시 예외 발생")
        void failWithForbiddenTeamPlace() throws Exception {
            // given
            final Long teamPlaceId = 1L;

            given(noticeService.findMostRecentNotice(teamPlaceId))
                    .willThrow(TeamPlaceException.TeamPlaceAccessForbidden.class);

            // when & then
            mockMvc.perform(get(GET_REQUEST_URL, teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("notice/find/fail/forbiddenTeamPlace",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀플레이스 Id")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    )
                            )
                    );
        }
    }
}

