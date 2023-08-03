package team.teamby.teambyteam.member.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.application.MemberService;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/team-places")
    public ResponseEntity<TeamPlacesResponse> getParticipatedTeamPlaces(@AuthPrincipal MemberEmailDto memberEmailDto) {
        final TeamPlacesResponse participatedTeamPlaces = memberService.getParticipatedTeamPlaces(memberEmailDto);

        return ResponseEntity.ok(participatedTeamPlaces);
    }

}
