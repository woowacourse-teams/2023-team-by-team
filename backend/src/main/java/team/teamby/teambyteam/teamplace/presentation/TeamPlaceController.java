package team.teamby.teambyteam.teamplace.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.teamplace.application.TeamPlaceService;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;

@RestController
@RequestMapping("/api/team-places")
@RequiredArgsConstructor
public class TeamPlaceController {

    private final TeamPlaceService teamPlaceService;

    @PostMapping
    public ResponseEntity<TeamPlaceCreateResponse> createTeamPlace(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestBody final TeamPlaceCreateRequest teamPlaceCreateRequest
    ) {
        final TeamPlaceCreateResponse response = teamPlaceService.create(memberEmailDto, teamPlaceCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
