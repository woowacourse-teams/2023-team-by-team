package team.teamby.teambyteam.aws.s3.application;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import team.teamby.teambyteam.aws.s3.S3PresignedUrlProvider;
import team.teamby.teambyteam.feed.application.dto.PreSignedUrlResponse;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlRequest;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlsRequest;
import team.teamby.teambyteam.feed.application.dto.PresignedUrlsResponse;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3UploadService {

    private static final String HASHING_ALGORITHM = "SHA-256";
    @Value("${aws.s3.directory}")
    private String directory;

    private final S3PresignedUrlProvider s3PresignedUrlProvider;

    public PresignedUrlsResponse getImageUploadPresignedUrl(final MemberEmailDto memberEmailDto, final PresignedUrlsRequest presignedUrlsRequest) throws NoSuchAlgorithmException {
        final List<PreSignedUrlResponse> responses = new ArrayList<>();

        String email = memberEmailDto.email();
        String hashedEmail = hashEmail(email);

        for (final PresignedUrlRequest request : presignedUrlsRequest.images()) {
            final String customKey = directory + "/" + UUID.randomUUID() + hashedEmail;
            final String url = s3PresignedUrlProvider.getImageUploadPresignedUrl(request.checkSum(), request.contentLength(), customKey);
            responses.add(new PreSignedUrlResponse(request.imageName(), url));
        }

        return new PresignedUrlsResponse(responses);
    }

    private String hashEmail(String email) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance(HASHING_ALGORITHM);
        return new String(md.digest(email.getBytes()));
    }
}
