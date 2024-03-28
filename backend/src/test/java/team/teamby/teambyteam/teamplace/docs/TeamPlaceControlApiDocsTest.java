package team.teamby.teambyteam.teamplace.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.exception.memberteamplace.TeamPlaceColorNotExistException;
import team.teamby.teambyteam.teamplace.application.TeamPlaceService;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceChangeColorRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceAccessForbiddenException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNameBlankException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNameLengthException;
import team.teamby.teambyteam.teamplace.presentation.TeamPlaceController;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.SEONGHA_EMAIL;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.CREATE_ENGLISH_TEAM_PLACE_REQUEST;

@WebMvcTest(TeamPlaceController.class)
public class TeamPlaceControlApiDocsTest extends ApiDocsTest {

    @MockBean
    private TeamPlaceService teamPlaceService;

    @Nested
    @DisplayName("팀플레이스 생성 API 문서화")
    class CreateTeamPlaceDocs {

        @Test
        @DisplayName("팀플레이스 생성 성공")
        void success() throws Exception {
            // given
            final TeamPlaceCreateRequest request = CREATE_ENGLISH_TEAM_PLACE_REQUEST();
            final TeamPlaceCreateResponse response = new TeamPlaceCreateResponse(1L);
            given(teamPlaceService.create(any(MemberEmailDto.class), any(TeamPlaceCreateRequest.class)))
                    .willReturn(response);

            // when & then
            mockMvc.perform(post("/api/team-places")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request))
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isCreated())
                    .andExpect(content().json(objectMapper.writeValueAsString(response)))
                    .andDo(print())
                    .andDo(document("teamPlaces/create/success",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()),
                            requestHeaders(
                                    headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                            ),
                            requestFields(
                                    fieldWithPath("name").type(JsonFieldType.STRING).description("생성할 팀플레이스의 이름")
                            ),
                            responseFields(
                                    fieldWithPath("teamPlaceId").type(JsonFieldType.NUMBER).description("생성된 팀플레이스의 ID")
                            )
                    ));
        }

        @Test
        @DisplayName("팀플레이스에 공백으로 요청시 400")
        void badRequestForBlankTeamPlaceName() throws Exception {
            // given
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest("");
            willThrow(new TeamPlaceNameBlankException())
                    .given(teamPlaceService)
                    .create(any(MemberEmailDto.class), any(TeamPlaceCreateRequest.class));

            // when & then
            mockMvc.perform(post("/api/team-places")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request))
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("teamPlaces/create/failBlankName",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("팀플레이스 이름이 30자 초과시 400")
        void badRequestForLongTeamPlaceName() throws Exception {
            // given
            final String longName = "a".repeat(31);
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest(longName);
            willThrow(new TeamPlaceNameLengthException(30, longName))
                    .given(teamPlaceService)
                    .create(any(MemberEmailDto.class), any(TeamPlaceCreateRequest.class));

            // when & then
            mockMvc.perform(post("/api/team-places")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request))
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("teamPlaces/create/failLongName",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }

    @Nested
    @DisplayName("팀플레이스 초대코드 조회 문서화")
    class GetTeamPlaceInviteCode {

        @Test
        @DisplayName("초대코드 조회에 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final TeamPlaceInviteCodeResponse response = new TeamPlaceInviteCodeResponse(teamPlaceId, "12ABcd7f");
            given(teamPlaceService.getTeamPlaceInviteCode(teamPlaceId))
                    .willReturn(response);

            // when & then
            mockMvc.perform(get("/api/team-places/{teamPlaceId}/invite-code", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().json(objectMapper.writeValueAsString(response)))
                    .andDo(print())
                    .andDo(document("teamPlaces/getInviteCode/success",
                            preprocessRequest(prettyPrint()),
                            preprocessResponse(prettyPrint()),
                            requestHeaders(
                                    headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                            ),
                            pathParameters(
                                    parameterWithName("teamPlaceId").description("조회할 팀플레이스 ID")
                            ),
                            responseFields(
                                    fieldWithPath("teamPlaceId").type(JsonFieldType.NUMBER).description("조회한 팀플레이스 ID"),
                                    fieldWithPath("inviteCode").type(JsonFieldType.STRING).description("초대코드 - 알파벳 대문자, 소문자, 숫자로 이루어진 8글")
                            )
                    ));
        }

        @Test
        @DisplayName("속하지 않은 팀플레이스의 코드 요청시 403")
        void forbiddenWithUnparticipatedTeamPlace() throws Exception {
            // given
            final Long teamPlaceId = 2L;
            willThrow(new TeamPlaceAccessForbiddenException(teamPlaceId, "test@email.com"))
                    .given(teamPlaceParticipationInterceptor)
                    .preHandle(any(), any(), any());

            // when & then
            mockMvc.perform(get("/api/team-places/{teamPlaceId}/invite-code", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("teamPlaces/getInviteCode/failWithForbiddenMember",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }

    @Nested
    @DisplayName("팀플레이스 색상 변경 문서화")
    class ChangeMemberTeamPlaceColor {

        @Test
        @DisplayName("팀 플레이스 색상 변경 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(1);
            willDoNothing().given(teamPlaceService).changeMemberTeamPlaceColor(any(MemberEmailDto.class), eq(teamPlaceId), any(TeamPlaceChangeColorRequest.class));

            // when & then
            mockMvc.perform(patch("/api/team-places/{teamPlaceId}/color", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("teamPlaces/changeTeamPlaceColor/success",
                                    preprocessRequest(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("teamPlaceColor").type(JsonFieldType.NUMBER).description("수정할 팀 플레이스 색상 번호")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("회원이 소속된 팀 플레이스가 아니면 실패")
        void failWhenNotParticipatedTeamPlace() throws Exception {
            // given
            final Long notParticipatedTeamPlaceId = -1L;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(1);
            String seonghaEmail = SEONGHA_EMAIL;
            willThrow(new TeamPlaceAccessForbiddenException(notParticipatedTeamPlaceId, seonghaEmail))
                    .given(teamPlaceService)
                    .changeMemberTeamPlaceColor(any(MemberEmailDto.class), eq(notParticipatedTeamPlaceId), any(TeamPlaceChangeColorRequest.class));

            // when & then
            mockMvc.perform(patch("/api/team-places/{teamPlaceId}/color", notParticipatedTeamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden())
                    .andDo(print())
                    .andDo(document("teamPlaces/changeTeamPlaceColor/failWhenNotParticipatedTeamPlace",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("요청한 색상 번호가 존재하지 않으면 실패")
        void failWhenNotExistTeamPlaceColor() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            int notExistTeamPlaceColor = -1;
            final TeamPlaceChangeColorRequest request = new TeamPlaceChangeColorRequest(notExistTeamPlaceColor);
            willThrow(new TeamPlaceColorNotExistException(notExistTeamPlaceColor))
                    .given(teamPlaceService)
                    .changeMemberTeamPlaceColor(any(MemberEmailDto.class), eq(teamPlaceId), any(TeamPlaceChangeColorRequest.class));

            // when & then
            mockMvc.perform(patch("/api/team-places/{teamPlaceId}/color", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("teamPlaces/changeTeamPlaceColor/failWhenNotExistTeamPlaceColor",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }
}
