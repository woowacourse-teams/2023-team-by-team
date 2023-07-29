package team.teamby.teambyteam.schedule.docs;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import team.teamby.teambyteam.auth.presentation.MemberInterceptor;
import team.teamby.teambyteam.auth.presentation.TeamPlaceParticipationInterceptor;
import team.teamby.teambyteam.schedule.application.TeamCalendarScheduleService;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.schedule.presentation.TeamCalendarScheduleController;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.*;

@AutoConfigureRestDocs
@WebMvcTest(TeamCalendarScheduleController.class)
@MockBean(value = {
        JpaMetamodelMappingContext.class
})
public class TeamCalendarScheduleApiDocsTest {

    private static final String AUTHORIZATION_HEADER_KEY = HttpHeaders.AUTHORIZATION;
    private static final String AUTHORIZATION_HEADER_VALUE = "Bearer aaaa.bbbb.cccc";
    private static final String REQUEST_TITLE_KEY = "title";
    private static final String REQUEST_START_DATE_TIME_KEY = "startDateTime";
    private static final String REQUEST_END_DATE_KEY = "endDateTime";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TeamCalendarScheduleService teamCalendarScheduleService;

    @MockBean
    private MemberInterceptor memberInterceptor;

    @MockBean
    private TeamPlaceParticipationInterceptor teamPlaceParticipationInterceptor;

    @BeforeEach
    void setup() throws Exception {
        given(memberInterceptor.preHandle(any(), any(), any()))
                .willReturn(true);
        given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                .willReturn(true);
    }

    @Nested
    @DisplayName("일정 등록 문서화")
    class RegisterScheduleDocs {

        @Test
        @DisplayName("일정 등록 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final ScheduleRegisterRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;
            final Long registeredId = 1L;
            given(teamCalendarScheduleService.register(request, teamPlaceId))
                    .willReturn(registeredId);

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string(HttpHeaders.LOCATION, "/api/team-place/" + teamPlaceId + "/calendar/schedules/" + registeredId))
                    .andDo(print())
                    .andDo(document("schedules/register/success",
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

        @Test
        @DisplayName("제목이 빈 값이면 실패")
        void failBlankTitle() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final String blankTitle = " ";
            LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(teamPlaceId).getSpan().getStartDateTime();
            LocalDateTime endDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(teamPlaceId).getSpan().getEndDateTime();
            ScheduleUpdateRequest request = new ScheduleUpdateRequest(blankTitle, startDateTime, endDateTime);
            willThrow(new ScheduleException.TitleBlankException())
                    .given(teamCalendarScheduleService)
                    .register(any(ScheduleRegisterRequest.class), eq(teamPlaceId));


            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("schedules/register/failBlankTitle",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("잘못된 날짜 형식이면 실패")
        void failWrongDateTimeType() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final String wrongStartDateTime = "2023:07:12 10:00";
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTime);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            willThrow(DateTimeParseException.class)
                    .given(teamCalendarScheduleService)
                    .register(any(ScheduleRegisterRequest.class), eq(teamPlaceId));


            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestMap)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("schedules/register/failWrongDateTimeType",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("없는 팀 플레이스 ID면 실패")
        void failNotExistTeamPlaceId() throws Exception {
            // given
            final Long notExistTeamPlaceId = -1L;
            final ScheduleRegisterRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;
            willThrow(new TeamPlaceException.NotFoundException())
                    .given(teamCalendarScheduleService)
                    .register(any(), eq(notExistTeamPlaceId));


            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/calendar/schedules", notExistTeamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("schedules/register/failNotExistTeamPlaceId",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("시작 일자와 종료 일자의 순서가 맞지 않으면 실패")
        void failSpanWrongOrder() throws Exception {
            // given
            final String title = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE;
            final Long teamPlaceId = 1L;
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(teamPlaceId).getSpan().getStartDateTime();
            final LocalDateTime wrongEndDateTime = startDateTime.minusDays(1);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            willThrow(new ScheduleException.SpanWrongOrderException())
                    .given(teamCalendarScheduleService)
                    .register(request, teamPlaceId);

            // when & then
            mockMvc.perform(post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("schedules/register/failSpanWrongOrder",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }


    @Nested
    @DisplayName("일정 수정 문서화")
    class UpdateScheduleDocs {

        @Test
        @DisplayName("일정 수정 성공")
        void success() throws Exception {
            // given
            final ScheduleUpdateRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;
            final Long teamPlaceId = 1L;
            final Long id = 1L;
            willDoNothing().given(teamCalendarScheduleService).update(request, teamPlaceId, id);

            // when & then
            mockMvc.perform(patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("schedules/update/success",
                                    preprocessRequest(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID"),
                                            parameterWithName("scheduleId").description("수정할 일정 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    requestFields(
                                            fieldWithPath("title").type(JsonFieldType.STRING).description("수정할 일정 제목"),
                                            fieldWithPath("startDateTime").type(JsonFieldType.STRING).description("수정할 일정의 시작 일시(형식 : yyyy-MM-dd HH:mm)"),
                                            fieldWithPath("endDateTime").type(JsonFieldType.STRING).description("수정할 일정의 종료 일시(형식 : yyyy-MM-dd HH:mm)")
                                    )
                            )
                    );

        }

        @Test
        @DisplayName("제목이 빈 값이면 실패")
        void failBlankTitle() throws Exception {
            // given
            final Long id = 1L;
            final Long teamPlaceId = 1L;
            final String blankTitle = " ";
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(teamPlaceId);
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime();
            final LocalDateTime endDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getEndDateTime();

            ScheduleUpdateRequest request = new ScheduleUpdateRequest(blankTitle, startDateTime, endDateTime);
            willThrow(new ScheduleException.TitleBlankException())
                    .given(teamCalendarScheduleService)
                    .update(any(ScheduleUpdateRequest.class), eq(teamPlaceId), eq(id));


            // when & then
            mockMvc.perform(patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("schedules/update/failBlankTitle",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("잘못된 날짜 형식이면 실패")
        void failWrongDateTimeType() throws Exception {
            // given
            final Long id = 1L;
            final Long teamPlaceId = 1L;
            final String wrongStartDateTime = "2023:07:12 10:00";
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTime);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            willThrow(DateTimeParseException.class)
                    .given(teamCalendarScheduleService)
                    .update(any(ScheduleUpdateRequest.class), eq(teamPlaceId), eq(id));


            // when & then
            mockMvc.perform(patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestMap)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("schedules/update/failWrongDateTimeType",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("없는 팀 플레이스 ID면 실패")
        void failNotExistTeamPlaceId() throws Exception {
            // given
            final Long id = 1L;
            final Long notExistTeamPlaceId = -1L;
            final ScheduleRegisterRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;
            willThrow(new TeamPlaceException.NotFoundException())
                    .given(teamCalendarScheduleService)
                    .update(any(), eq(notExistTeamPlaceId), eq(id));


            // when & then
            mockMvc.perform(patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", notExistTeamPlaceId, id)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("schedules/update/failNotExistTeamPlaceId",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("시작 일자와 종료 일자의 순서가 맞지 않으면 실패")
        void failSpanWrongOrder() throws Exception {
            // given
            final Long id = 1L;
            final String title = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE;
            final Long teamPlaceId = 1L;
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(teamPlaceId).getSpan().getStartDateTime();
            final LocalDateTime wrongEndDateTime = startDateTime.minusDays(1);
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(title, startDateTime, wrongEndDateTime);

            willThrow(new ScheduleException.SpanWrongOrderException())
                    .given(teamCalendarScheduleService)
                    .update(request, teamPlaceId, id);

            // when & then
            mockMvc.perform(patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andDo(print())
                    .andDo(document("schedules/update/failSpanWrongOrder",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }

        @Test
        @DisplayName("없는 일정 ID면 실패")
        void failNotExistScheduleId() throws Exception {
            // given
            final Long notExistScheduleId = -1L;
            final Long teamPlaceId = 1L;
            final ScheduleRegisterRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;
            willThrow(new ScheduleException.ScheduleNotFoundException())
                    .given(teamCalendarScheduleService)
                    .update(any(), eq(teamPlaceId), eq(notExistScheduleId));


            // when & then
            mockMvc.perform(patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, notExistScheduleId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("schedules/update/failNotExistScheduleId",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }
}
