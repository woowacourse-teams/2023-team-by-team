package team.teamby.teambyteam.aws.s3.application;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import team.teamby.teambyteam.aws.s3.S3PresignedUrlProvider;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.feed.application.dto.PreSignedUrlResponse;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlRequest;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlsRequest;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlsResponse;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3UploadService {

    @Value("${aws.s3.directory}")
    private String directory;

    private final S3PresignedUrlProvider s3PresignedUrlProvider;

    public PresignedUrlsResponse getImageUploadPresignedUrl(final MemberEmailDto memberEmailDto, final PresignedUrlsRequest presignedUrlsRequest) {
        final List<PreSignedUrlResponse> responses = new ArrayList<>();
        final String encodedEmail =
                new String(Base64.getUrlEncoder().encode(memberEmailDto.email().getBytes(StandardCharsets.UTF_8)));

        for (final PresignedUrlRequest request : presignedUrlsRequest.images()) {
            String customKey = directory + "/" + UUID.randomUUID() + encodedEmail;
            final String url = s3PresignedUrlProvider.getImageUploadPresignedUrl(request.checkSum(), request.contentLength(), customKey);
            responses.add(new PreSignedUrlResponse(request.imageName(), url));
        }

        return new PresignedUrlsResponse(responses);
    }
}
