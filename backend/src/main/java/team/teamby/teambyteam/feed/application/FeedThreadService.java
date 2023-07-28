package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedThreadService {

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;

    public Long write(
            final FeedThreadWritingRequest feedThreadWritingRequest,
            final MemberEmailDto memberEmailDto,
            final Long teamPlaceId
    ) {

        final Content content = new Content(feedThreadWritingRequest.content());
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final Feed feed = new FeedThread(teamPlaceId, content, memberId.id());

        final Feed savedFeed = feedRepository.save(feed);
        return savedFeed.getId();
    }
}
