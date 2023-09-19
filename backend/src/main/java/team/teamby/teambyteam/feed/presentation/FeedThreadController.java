package team.teamby.teambyteam.feed.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.aws.s3.application.S3UploadService;
import team.teamby.teambyteam.feed.application.FeedThreadService;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlsRequest;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlsResponse;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

import java.net.URI;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/team-place")
@RequiredArgsConstructor
public class FeedThreadController {

    private final FeedThreadService feedThreadService;
    private final S3UploadService s3UploadService;

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

    @GetMapping(value = "/{teamPlaceId}/feed/threads", params = {"size"})
    public ResponseEntity<FeedsResponse> read(
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam final Integer size
    ) {
        FeedsResponse feeds = feedThreadService.firstRead(teamPlaceId, memberEmailDto, size);

        return ResponseEntity.ok(feeds);
    }

    @GetMapping(value = "/{teamPlaceId}/feed/threads", params = {"last-thread-id", "size"})
    public ResponseEntity<FeedsResponse> read(
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam("last-thread-id") final Long threadId,
            @RequestParam final Integer size
    ) {
        FeedsResponse feeds = feedThreadService.reRead(teamPlaceId, memberEmailDto, threadId, size);

        return ResponseEntity.ok(feeds);
    }

    @PostMapping("/{teamPlaceId}/feed/threads/images")
    public ResponseEntity<PresignedUrlsResponse> receivePresignedUrl(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestBody final PresignedUrlsRequest images) throws NoSuchAlgorithmException {
        final PresignedUrlsResponse response = s3UploadService.getImageUploadPresignedUrl(memberEmailDto, images);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
