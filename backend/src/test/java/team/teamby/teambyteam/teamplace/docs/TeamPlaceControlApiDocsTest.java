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
import team.teamby.teambyteam.teamplace.application.TeamPlaceService;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;
import team.teamby.teambyteam.teamplace.presentation.TeamPlaceController;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
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
            willThrow(new TeamPlaceException.NameBlankException())
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
        void badRequestForLongTeamPlaceName() throws Exception{
            // given
            final TeamPlaceCreateRequest request = new TeamPlaceCreateRequest("a".repeat(31));
            willThrow(new TeamPlaceException.NameLengthException())
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
}
