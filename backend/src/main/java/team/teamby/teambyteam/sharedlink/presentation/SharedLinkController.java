package team.teamby.teambyteam.sharedlink.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.sharedlink.application.SharedLinkService;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;

import java.net.URI;

@RestController
@RequestMapping("/api/team-place")
@RequiredArgsConstructor
public class SharedLinkController {

    private final SharedLinkService sharedLinkService;

    @PostMapping("/{teamPlaceId}/team-links")
    public ResponseEntity<Void> createSharedLink(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @PathVariable final Long teamPlaceId,
            @RequestBody @Valid final SharedLinkCreateRequest sharedLinkCreateRequest
    ) {
        final Long sharedLinkId = sharedLinkService.create(memberEmailDto, teamPlaceId, sharedLinkCreateRequest);

        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/team-links/" + sharedLinkId);
        return ResponseEntity.created(location).build();
    }
}
