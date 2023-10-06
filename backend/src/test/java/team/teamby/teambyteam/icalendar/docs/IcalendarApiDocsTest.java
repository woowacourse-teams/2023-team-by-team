package team.teamby.teambyteam.icalendar.docs;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import team.teamby.teambyteam.common.ApiDocsTest;
import team.teamby.teambyteam.icalendar.application.IcalendarService;
import team.teamby.teambyteam.icalendar.application.dto.IcalendarUrlResponse;
import team.teamby.teambyteam.icalendar.presentation.IcalendarController;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
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
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(IcalendarController.class)
public class IcalendarApiDocsTest extends ApiDocsTest {

    @MockBean
    private IcalendarService icalendarService;

    @Nested
    @DisplayName("Icalendar Url 조회 문서화")
    class IcalendarPublishedUrlGetDocs {

        @Test
        @DisplayName("조회 성공")
        void success() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Optional<IcalendarUrlResponse> response = Optional.of(new IcalendarUrlResponse("https://assets.teamby.team/path/ical.ics"));
            given(icalendarService.getPublishedIcalUrl(teamPlaceId))
                    .willReturn(response);

            // when
            // then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/icalendar-url", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("icalendar/published-url/success",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint()),
                                    pathParameters(
                                            parameterWithName("teamPlaceId").description("멤버가 속한 팀 플레이스 ID")
                                    ),
                                    requestHeaders(
                                            headerWithName(AUTHORIZATION_HEADER_KEY).description("사용자 JWT 인증 정보")
                                    ),
                                    responseFields(
                                            fieldWithPath("url").type(JsonFieldType.STRING).description("배포된 ics파일 url")
                                    )
                            )
                    );
        }

        @Test
        @DisplayName("조회 성공")
        void failWhenTheIcalNotPublished() throws Exception {
            // given
            final Long teamPlaceId = 1L;
            final Optional<IcalendarUrlResponse> response = Optional.empty();
            given(icalendarService.getPublishedIcalUrl(teamPlaceId))
                    .willReturn(response);

            // when
            // then
            mockMvc.perform(get("/api/team-place/{teamPlaceId}/icalendar-url", teamPlaceId)
                            .header(AUTHORIZATION_HEADER_KEY, AUTHORIZATION_HEADER_VALUE)
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound())
                    .andDo(print())
                    .andDo(document("icalendar/published-url/not-published",
                                    preprocessRequest(prettyPrint()),
                                    preprocessResponse(prettyPrint())
                            )
                    );
        }
    }
}
