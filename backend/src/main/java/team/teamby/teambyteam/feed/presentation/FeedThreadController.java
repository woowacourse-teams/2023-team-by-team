package team.teamby.teambyteam.feed.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.feed.application.FeedReadService;
import team.teamby.teambyteam.feed.application.FeedWriteService;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

import java.net.URI;

@RestController
@RequestMapping("/api/team-place")
@RequiredArgsConstructor
public class FeedThreadController {

    private final FeedReadService feedReadService;
    private final FeedWriteService feedWriteService;

    @PostMapping("/{teamPlaceId}/feed/threads")
    public ResponseEntity<Void> write(
            @ModelAttribute @Valid final FeedThreadWritingRequest request,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @PathVariable final Long teamPlaceId
    ) {
        final Long threadId = feedWriteService.write(request, memberEmailDto, teamPlaceId);
        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/feed/threads/" + threadId);

        return ResponseEntity.created(location).build();
    }

    @GetMapping(value = "/{teamPlaceId}/feed/threads", params = {"size"})
    public ResponseEntity<FeedsResponse> read(
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam final Integer size
    ) {
        FeedsResponse feeds = feedReadService.firstRead(teamPlaceId, memberEmailDto, size);

        return ResponseEntity.ok(feeds);
    }

    @GetMapping(value = "/{teamPlaceId}/feed/threads", params = {"last-thread-id", "size"})
    public ResponseEntity<FeedsResponse> read(
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam("last-thread-id") final Long threadId,
            @RequestParam final Integer size
    ) {
        FeedsResponse feeds = feedReadService.reRead(teamPlaceId, memberEmailDto, threadId, size);

        return ResponseEntity.ok(feeds);
    }
}
