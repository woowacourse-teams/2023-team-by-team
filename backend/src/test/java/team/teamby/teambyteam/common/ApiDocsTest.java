package team.teamby.teambyteam.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.auth.presentation.MemberInterceptor;
import team.teamby.teambyteam.auth.presentation.TeamPlaceParticipationInterceptor;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@AutoConfigureRestDocs
@WebMvcTest
@MockBean(JpaMetamodelMappingContext.class)
public abstract class ApiDocsTest {

    protected static final String AUTHORIZATION_HEADER_KEY = HttpHeaders.AUTHORIZATION;
    protected static final String AUTHORIZATION_HEADER_VALUE = "Bearer aaaa.bbbb.cccc";

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected MemberInterceptor memberInterceptor;

    @MockBean
    protected TeamPlaceParticipationInterceptor teamPlaceParticipationInterceptor;

    @MockBean
    protected JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setup() throws Exception {
        given(memberInterceptor.preHandle(any(), any(), any()))
                .willReturn(true);
        given(teamPlaceParticipationInterceptor.preHandle(any(), any(), any()))
                .willReturn(true);
    }
}
