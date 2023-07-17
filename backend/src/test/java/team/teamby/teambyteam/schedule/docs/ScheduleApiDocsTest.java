package team.teamby.teambyteam.schedule.docs;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import team.teamby.teambyteam.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.member.configuration.MemberInterceptor;
import team.teamby.teambyteam.schedule.application.ScheduleService;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.schedule.presentation.TeamPlaceScheduleController;
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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

@AutoConfigureRestDocs
@WebMvcTest(TeamPlaceScheduleController.class)
public class ScheduleApiDocsTest {

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
    private ScheduleService scheduleService;

    @MockBean
    private MemberInterceptor memberInterceptor;

    @Nested
    @DisplayName("일정 등록 문서화")
    class RegisterScheduleDocs {

        @Test
        @DisplayName("일정 등록 성공")
        void success() throws Exception {
            // given
            final ScheduleRegisterRequest request = Schedule1_N_Hour.REQUEST;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final Long registeredId = 1L;
            given(scheduleService.register(request, teamPlaceId))
                    .willReturn(registeredId);
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willReturn(true);

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
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final String blankTitle = " ";
            ScheduleUpdateRequest request = new ScheduleUpdateRequest(blankTitle, Schedule1_N_Hour.START_DATE_TIME, Schedule1_N_Hour.END_DATE_TIME);
            willThrow(new ScheduleException.TitleBlankException("제목은 빈 값일 수 없습니다."))
                    .given(scheduleService)
                    .register(any(ScheduleRegisterRequest.class), eq(teamPlaceId));

            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willReturn(true);

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
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final String wrongStartDateTime = "2023:07:12 10:00";
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, Schedule1_N_Hour.TITLE);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTime);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            willThrow(DateTimeParseException.class)
                    .given(scheduleService)
                    .register(any(ScheduleRegisterRequest.class), eq(teamPlaceId));

            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willReturn(true);

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
            ScheduleRegisterRequest request = Schedule1_N_Hour.REQUEST;
            willThrow(new TeamPlaceException.NotFoundException("ID에 해당하는 팀 플레이스를 찾을 수 없습니다."))
                    .given(scheduleService)
                    .register(any(), eq(notExistTeamPlaceId));

            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willReturn(true);

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
            final String title = ScheduleFixtures.Schedule1_N_Hour.TITLE;
            final Long teamPlaceId = ScheduleFixtures.Schedule1_N_Hour.TEAM_PLACE_ID;
            final LocalDateTime startDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME;
            final LocalDateTime wrongEndDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME.minusDays(1);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            willThrow(new ScheduleException.SpanWrongOrderException("시작 일자가 종료 일자보다 이후일 수 없습니다."))
                    .given(scheduleService)
                    .register(request, teamPlaceId);
            given(memberInterceptor.preHandle(any(), any(), any()))
                    .willReturn(true);

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
}
