package team.teamby.teambyteam.teamplace.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.teamplace.application.TeamPlaceService;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMembersResponse;

@RestController
@RequestMapping("/api/team-places")
@RequiredArgsConstructor
public class TeamPlaceController {

    private final TeamPlaceService teamPlaceService;

    @PostMapping
    public ResponseEntity<TeamPlaceCreateResponse> createTeamPlace(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestBody @Valid final TeamPlaceCreateRequest teamPlaceCreateRequest
    ) {
        final TeamPlaceCreateResponse response = teamPlaceService.create(memberEmailDto, teamPlaceCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{teamPlaceId}/invite-code")
    public ResponseEntity<TeamPlaceInviteCodeResponse> getTeamPlaceInviteCode(
            @PathVariable final Long teamPlaceId
    ) {
        final TeamPlaceInviteCodeResponse response = teamPlaceService.getTeamPlaceInviteCode(teamPlaceId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{teamPlaceId}/members")
    public ResponseEntity<TeamPlaceMembersResponse> getTeamPlaceMembers(
            @PathVariable final Long teamPlaceId
    ) {
        final TeamPlaceMembersResponse response = teamPlaceService.findMembers(teamPlaceId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
