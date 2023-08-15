package team.teamby.teambyteam.schedule.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.MyCalendarScheduleService;
import team.teamby.teambyteam.schedule.application.dto.SchedulesWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.presentation.MyCalendarScheduleController;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MyCalendarScheduleController.class)
public class MyCalendarScheduleApiDocsTest extends ApiDocsTest {

    @MockBean
    private MyCalendarScheduleService myCalendarScheduleService;

    @Nested
    @DisplayName("일정 조회 성공 테스트")
    class SuccessDocs {

        @Test
        @DisplayName("월간 일정 조회 성공")
        void daily() throws Exception {
            // given
            final Schedule schedule1 = Mockito.spy(ScheduleFixtures.MONTH_6_AND_MONTH_7_SCHEDULE(1L));
            final Schedule schedule2 = Mockito.spy(ScheduleFixtures.MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(2L));
            when(schedule1.getId()).thenReturn(1L);
            when(schedule2.getId()).thenReturn(2L);

            final List<Schedule> schedules = List.of(schedule1, schedule2);
            SchedulesWithTeamPlaceIdResponse response = SchedulesWithTeamPlaceIdResponse.of(schedules);

            given(myCalendarScheduleService.findDailySchedule(any(), anyInt(), anyInt(), anyInt()))
                    .willReturn(response);

            // when & then
            mockMvc.perform(get("/api/my-calendar/schedules")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .accept(MediaType.APPLICATION_JSON)
                            .param("year", "2023")
                            .param("month", "7")
                            .param("day", "12"))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("my-calendar/schedules/findSchedulesInPeriodDaily/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    queryParameters(
                                            parameterWithName("year").description("조회할 연도"),
                                            parameterWithName("month").description("조회할 월"),
                                            parameterWithName("day").optional().description("조회할 일 (Optional)")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseFields(
                                            fieldWithPath("schedules").type(JsonFieldType.ARRAY).description("등록된 일정들 리스트"),
                                            fieldWithPath("schedules[0].id").type(JsonFieldType.NUMBER).description("조회한 일정 ID"),
                                            fieldWithPath("schedules[0].teamPlaceId").type(JsonFieldType.NUMBER).description("조회한 일정이 등록된 팀플레이스 아이디"),
                                            fieldWithPath("schedules[0].title").type(JsonFieldType.STRING).description("조회한 일정 제목"),
                                            fieldWithPath("schedules[0].startDateTime").type(JsonFieldType.STRING).description("조회한 일정의 시작 일시(형식 : yyyy-MM-dd HH:mm)"),
                                            fieldWithPath("schedules[0].endDateTime").type(JsonFieldType.STRING).description("조회한 일정의 종료 일시(형식 : yyyy-MM-dd HH:mm)")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("월간 일정 조회 성공")
        void monthly() throws Exception {
            // given
            final Schedule schedule1 = Mockito.spy(ScheduleFixtures.MONTH_6_AND_MONTH_7_SCHEDULE(1L));
            final Schedule schedule2 = Mockito.spy(ScheduleFixtures.MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(2L));
            final Schedule schedule3 = Mockito.spy(ScheduleFixtures.MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(1L));
            when(schedule1.getId()).thenReturn(1L);
            when(schedule2.getId()).thenReturn(2L);
            when(schedule3.getId()).thenReturn(3L);

            final List<Schedule> schedules = List.of(schedule1, schedule2, schedule3);
            SchedulesWithTeamPlaceIdResponse response = SchedulesWithTeamPlaceIdResponse.of(schedules);

            given(myCalendarScheduleService.findScheduleInPeriod(any(), anyInt(), anyInt()))
                    .willReturn(response);

            // when & then
            mockMvc.perform(get("/api/my-calendar/schedules")
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .accept(MediaType.APPLICATION_JSON)
                            .param("year", "2023")
                            .param("month", "7"))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("my-calendar/schedules/findSchedulesInPeriodMonthly/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    queryParameters(
                                            parameterWithName("year").description("조회할 연도"),
                                            parameterWithName("month").description("조회할 월")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseFields(
                                            fieldWithPath("schedules").type(JsonFieldType.ARRAY).description("등록된 일정들 리스트"),
                                            fieldWithPath("schedules[0].id").type(JsonFieldType.NUMBER).description("조회한 일정 ID"),
                                            fieldWithPath("schedules[0].teamPlaceId").type(JsonFieldType.NUMBER).description("조회한 일정이 등록된 팀플레이스 아이디"),
                                            fieldWithPath("schedules[0].title").type(JsonFieldType.STRING).description("조회한 일정 제목"),
                                            fieldWithPath("schedules[0].startDateTime").type(JsonFieldType.STRING).description("조회한 일정의 시작 일시(형식 : yyyy-MM-dd HH:mm)"),
                                            fieldWithPath("schedules[0].endDateTime").type(JsonFieldType.STRING).description("조회한 일정의 종료 일시(형식 : yyyy-MM-dd HH:mm)")
                                    )
                            )
                    );
        }
    }
}
