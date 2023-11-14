package team.teamby.teambyteam.notice.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.ROY;
import static team.teamby.teambyteam.common.fixtures.NoticeFixtures.NOTICE_2ND;

import java.util.Collections;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockPart;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.web.multipart.MultipartFile;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.common.fixtures.FileFixtures;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.notice.application.NoticeService;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.presentation.NoticeController;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

@WebMvcTest(NoticeController.class)
public class NoticeApiDocsTest extends ApiDocsTest {

    public static final String POST_REQUEST_URL = "/api/team-place/{teamPlaceId}/feed/notice";
    public static final String GET_REQUEST_URL = "/api/team-place/{teamPlaceId}/feed/notice/recent";

    @MockBean
    private NoticeService noticeService;

    @MockBean
    private FileStorageManager fileStorageManager;

    @BeforeEach
    void setUp() {
        given(fileStorageManager.upload(any(MultipartFile.class), any(String.class), any(String.class)))
                .willReturn("https://s3://seongha-seeik");
    }

    @Nested
    @DisplayName("공지 등록 문서화")
    class RegisterNoticeDocs {

        @Test
        @DisplayName("공지 등록 성공")
        void successRegisterNotice() throws Exception {
            //given
            final Long teamPlaceId = 1L;
            final Long registeredId = 1L;

            given(noticeService.register(any(NoticeRegisterRequest.class), any(Long.class), any()))
                    .willReturn(registeredId);

            // when & then
            mockMvc.perform(multipart(POST_REQUEST_URL, teamPlaceId)
                            .file("images", FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1.getBytes())
                            .part(new MockPart("content", "TEST".getBytes()))
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                    .andExpect(status().isCreated())
                    .andExpect(header().string(HttpHeaders.LOCATION,
                            "/api/team-place/" + teamPlaceId + "/feed/threads/notice/" + registeredId))
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
                                    requestParts(
                                            partWithName("content").description("등록할 내용"),
                                            partWithName("images").description("등록할 이미지들")
                                    ),
                                    responseHeaders(
                                            headerWithName(HttpHeaders.LOCATION).description("공지 등록 후 Location 헤더")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("사용자가 소속되지 않은 팀플레이스 아이디로 요청 시 등록에 실패")
        void failWithForbiddenTeamPlace() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId, "email@email.com"));

            // when & then
            mockMvc.perform(multipart(POST_REQUEST_URL, teamPlaceId)
                            .file("images", FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1.getBytes())
                            .part(new MockPart("content", "TEST".getBytes()))
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                    .andDo(print())
                    .andDo(document("notice/register/fail/forbiddenTeamPlace",
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
        @DisplayName("존재하지 않는 팀플레이스 아이디로 요청 시 등록에 실패")
        void failWithNonExistTeamPlace() throws Exception {
            // given
            final Long nonExistTeamPlaceId = -1L;
            given(noticeService.register(any(NoticeRegisterRequest.class), eq(nonExistTeamPlaceId), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(nonExistTeamPlaceId, "email@email.com"));

            // when & then
            mockMvc.perform(multipart(POST_REQUEST_URL, nonExistTeamPlaceId)
                            .file("images", FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1.getBytes())
                            .part(new MockPart("content", "TEST".getBytes()))
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                    .andDo(print())
                    .andDo(document("notice/register/fail/nonExistTeamPlace",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("존재하지 않는 팀플레이스 ID")

                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("존재하지 않는 사용자로 요청시 등록에 실패")
        void failWithUnauthorizedMember() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new MemberException.MemberNotFoundException("email@email.com"));

            // when & then
            mockMvc.perform(multipart(POST_REQUEST_URL, teamPlaceId)
                            .file("images", FileFixtures.UNDER_SIZE_PNG_MOCK_MULTIPART_FILE1.getBytes())
                            .part(new MockPart("content", "TEST".getBytes()))
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
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
                    "2023-01-01 00:00", Collections.emptyList()));

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
                                            fieldWithPath("profileImageUrl").type(JsonFieldType.STRING)
                                                    .description("공지를 등록한 멤버 이미지"),
                                            fieldWithPath("createdAt").type(JsonFieldType.STRING).description("공지를 등록한 날짜"),
                                            fieldWithPath("images").type(JsonFieldType.ARRAY).description("공지 이미지 리스트")
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
                    "2022-01-01 00:00", Collections.emptyList()));

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
                                            fieldWithPath("authorId").type(JsonFieldType.NULL)
                                                    .description("탈퇴하여 확인할 수 없는 멤버Id"),
                                            fieldWithPath("authorName").type(JsonFieldType.STRING)
                                                    .description("탈퇴하여 확인할 수 없는 멤버 이름"),
                                            fieldWithPath("profileImageUrl").type(JsonFieldType.STRING)
                                                    .description("탈퇴하여 확인할 수 없는 멤버 프로필"),
                                            fieldWithPath("createdAt").type(JsonFieldType.STRING).description("공지를 등록한 날짜"),
                                            fieldWithPath("images").type(JsonFieldType.ARRAY).description("공지 이미지 리스트")
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
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(nonExistTeamPlaceId, "email@email.com"));

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
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId, "email@email.com"));

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

