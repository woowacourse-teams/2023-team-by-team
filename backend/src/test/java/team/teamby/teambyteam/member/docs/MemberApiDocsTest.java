package team.teamby.teambyteam.member.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.member.application.MemberService;
import team.teamby.teambyteam.member.application.dto.MemberInfoResponse;
import team.teamby.teambyteam.member.application.dto.TeamPlaceResponse;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.member.presentation.MemberController;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeNotFoundException;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseBody;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
public final class MemberApiDocsTest extends ApiDocsTest {

    @MockBean
    private MemberService memberService;

    @Nested
    @DisplayName("내 정보 조회 조회 문서화")
    class RetrieveMyInformation {

        @Test
        @DisplayName("내 정보 조회 성공")
        void success() throws Exception {
            // given
            final Long id = 1L;
            final String name = "name";
            final String profileUrl = "/";
            final String email = "email@email.com";
            given(memberService.getMemberInformation(any()))
                    .willReturn(new MemberInfoResponse(id, name, profileUrl, email));

            // when & then
            mockMvc.perform(get("/api/me")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("members/retrieveMyInformation/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
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
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(get("/api/me")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("members/retrieveMyInformation/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }
    }

    @Nested
    @DisplayName("참가한 팀플레이스 조회 문서화")
    class RetrieveParticipatedTeamPlaceDocs {

        @Test
        @DisplayName("팀플레이스 조회 성공")
        void success() throws Exception {
            // given
            final TeamPlaceResponse teamPlaceResponse = new TeamPlaceResponse(1L, "teamPlace", 1);
            final TeamPlacesResponse teamPlacesResponse = new TeamPlacesResponse(List.of(teamPlaceResponse));
            given(memberService.getParticipatedTeamPlaces(any()))
                    .willReturn(teamPlacesResponse);

            // when & then
            mockMvc.perform(get("/api/me/team-places")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("members/retrieveParticipatedTeamPlaces/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 사용자면 실패한다.")
        void failIfUnAuthentication() throws Exception {
            // given
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(get("/api/me/team-places")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("members/retrieveParticipatedTeamPlaces/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }
    }

    @Nested
    @DisplayName("팀플레이스 탈퇴 문서화")
    class LeaveTeamPlaceDocs {

        @Test
        @DisplayName("팀플레이스 탈퇴 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;

            // when & then
            mockMvc.perform(delete("/api/me/team-places/{teamPlaceId}", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNoContent())
                    .andDo(print())
                    .andDo(document("members/leaveTeamPlace/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("탈퇴할 팀플레이스")
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
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(delete("/api/me/team-places/{teamPlaceId}", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("members/leaveTeamPlace/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("탈퇴할 팀플레이스")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("참여한 팀플레이스가 아니면 실패한다.")
        void failIfNotParticipated() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new TeamPlaceException.TeamPlaceAccessForbidden(teamPlaceId, "사용자 email"));

            // when & then
            mockMvc.perform(delete("/api/me/team-places/{teamPlaceId}", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("members/leaveTeamPlace/fail/notParticipated",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("탈퇴할 팀플레이스")
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
    @DisplayName("팀플레이스 참가 문서화")
    class ParticipateTeamPlaceDocs {

        @Test
        @DisplayName("팀플레이스 참여 성공")
        void success() throws Exception {
            // given
            final String inviteCode = "aaaa1234";
            final TeamPlaceParticipantResponse response = new TeamPlaceParticipantResponse(1L);
            given(memberService.participateTeamPlace(any(), any()))
                    .willReturn(response);

            // when & then
            mockMvc.perform(post("/api/me/team-places/{inviteCode}", inviteCode)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isCreated())
                    .andDo(print())
                    .andDo(document("members/particiPateTeamPlace/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("inviteCode").description("참여할 팀플레이스의 초대코드")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("존재하지 않는 참여코드로 요청 시 에러를 반환한다.")
        void failIfNotExistsInviteCode() throws Exception {
            // given
            final String invalidInviteCode = "aaaa1234";
            given(memberService.participateTeamPlace(any(), any()))
                    .willThrow(new TeamPlaceInviteCodeNotFoundException(invalidInviteCode));

            // when & then
            mockMvc.perform(post("/api/me/team-places/{inviteCode}", invalidInviteCode)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("members/particiPateTeamPlace/fail/notFoundInviteCode",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("inviteCode").description("참여할 팀플레이스의 초대코드")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("8글자가 아닌 참여코드로 요청 시 에러를 반환한다.")
        void failIfNotInvalidLength() throws Exception {
            // given
            final String invalidInviteCode = "123456789";
            given(memberService.participateTeamPlace(any(), any()))
                    .willThrow(new TeamPlaceInviteCodeException.LengthException(8, invalidInviteCode));

            // when & then
            mockMvc.perform(post("/api/me/team-places/{inviteCode}", invalidInviteCode)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("members/particiPateTeamPlace/fail/invalidLengthInviteCode",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("inviteCode").description("참여할 팀플레이스의 초대코드")
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
        void failIfNotUnAuthorized() throws Exception {
            // given
            final String inviteCode = "aaaa1234";
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(post("/api/me/team-places/{inviteCode}", inviteCode)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("members/particiPateTeamPlace/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("inviteCode").description("참여할 팀플레이스의 초대코드")
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
    @DisplayName("멤버 탈퇴 문서화")
    class DeleteAccountDocs {

        @Test
        @DisplayName("멤버 탈퇴 성공")
        void success() throws Exception {
            // when & then
            mockMvc.perform(delete("/api/me/account")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNoContent())
                    .andDo(print())
                    .andDo(document("members/leaveAccount/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("없는 멤버 탈퇴 실패")
        void failIfNotRegisteredMember() throws Exception {
            //given
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new MemberNotFoundException("없는 이메일"));


            // when & then
            mockMvc.perform(delete("/api/me/account")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("members/leaveAccount/fail/notRegistered",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }

        @Test
        @DisplayName("인증되지 않은 요청 시 실패")
        void failIfNotAuthenticated() throws Exception {
            // given
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willThrow(new AuthenticationException.FailAuthenticationException("잘못된 액세스 토큰"));

            // when & then
            mockMvc.perform(delete("/api/me/account")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isUnauthorized())
                    .andDo(print())
                    .andDo(document("members/leaveAccount/fail/unAuthorized",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseBody()
                            )
                    );
        }
    }
}
