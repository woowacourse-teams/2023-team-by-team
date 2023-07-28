package team.teamby.teambyteam.feed.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.feed.application.FeedThreadService;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

import java.net.URI;

@RestController
@RequestMapping("/api/team-place")
@RequiredArgsConstructor
public class FeedThreadController {

    private final FeedThreadService feedThreadService;

    @PostMapping("/{teamPlaceId}/feed/threads")
    public ResponseEntity<Void> write(
            @RequestBody @Valid final FeedThreadWritingRequest request,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @PathVariable final Long teamPlaceId
    ) {
        final Long threadId = feedThreadService.write(request, memberEmailDto, teamPlaceId);
        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/feed/threads/" + threadId);

        return ResponseEntity.created(location).build();
    }
}
