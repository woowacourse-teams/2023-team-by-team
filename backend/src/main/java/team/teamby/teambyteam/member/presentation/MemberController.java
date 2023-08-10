package team.teamby.teambyteam.member.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.application.MemberService;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/team-places")
    public ResponseEntity<TeamPlacesResponse> getParticipatedTeamPlaces(@AuthPrincipal final MemberEmailDto memberEmailDto) {
        final TeamPlacesResponse participatedTeamPlaces = memberService.getParticipatedTeamPlaces(memberEmailDto);

        return ResponseEntity.ok(participatedTeamPlaces);
    }

    @DeleteMapping("/team-places/{teamPlaceId}")
    public ResponseEntity<Void> leaveTeamPlace(@AuthPrincipal final MemberEmailDto memberEmailDto, @PathVariable final Long teamPlaceId) {
        memberService.leaveTeamPlace(memberEmailDto, teamPlaceId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/team-places/{inviteCode}")
    public ResponseEntity<TeamPlaceParticipantResponse> getParticipatedTeamPlaces(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @PathVariable final String inviteCode
    ) {
        final TeamPlaceParticipantResponse response = memberService.participateTeamPlace(memberEmailDto, inviteCode);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
