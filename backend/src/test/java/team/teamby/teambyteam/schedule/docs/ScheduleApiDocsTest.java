package team.teamby.teambyteam.schedule.docs;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import team.teamby.teambyteam.schedule.application.ScheduleService;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.presentation.ScheduleController;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

@AutoConfigureRestDocs
@WebMvcTest(ScheduleController.class)
public class ScheduleApiDocsTest {

    private static final String AUTHORIZATION_HEADER_KEY = HttpHeaders.AUTHORIZATION;
    private static final String AUTHORIZATION_HEADER_VALUE = "Bearer aaaa.bbbb.cccc";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ScheduleService scheduleService;

    @Test
    @DisplayName("일정 등록 문서화")
    void registerScheduleDocs() throws Exception {
        // given
        final ScheduleRegisterRequest request = Schedule1_N_Hour.REQUEST;
        final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
        final Long registeredId = 1L;
        given(scheduleService.register(request, teamPlaceId))
                .willReturn(registeredId);

        // when & then
        mockMvc.perform(post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                        .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().string(HttpHeaders.LOCATION, "/api/team-place/" + teamPlaceId + "/calendar/schedules/" + registeredId))
                .andDo(print())
                .andDo(document("schedules/register",
                                preprocessRequest(prettyPrint()),
                                pathParameters(
                                        parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                ),
                                requestHeaders(
                                        headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                ),
                                requestFields(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("등록할 일정 제목"),
                                        fieldWithPath("startDateTime").type(JsonFieldType.STRING).description("등록할 일정의 시작 일시(형식 : yyyy-MM-dd HH:mm)"),
                                        fieldWithPath("endDateTime").type(JsonFieldType.STRING).description("등록할 일정의 종료 일시(형식 : yyyy-MM-dd HH:mm)")
                                )
                        )
                );
    }
}
