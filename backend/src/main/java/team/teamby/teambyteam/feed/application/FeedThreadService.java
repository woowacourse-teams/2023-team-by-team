package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberIdAndDisplayNameOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedThreadService {

    private static final String SORT_CRITERIA = "id";
    private static final Sort.Direction SORT_DIRECTION = Sort.Direction.DESC;
    private static final int FIRST_PAGE = 0;

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

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

    @Transactional(readOnly = true)
    public FeedsResponse firstRead(final Long teamPlaceId, final Integer size) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceId(teamPlaceId, pageSize);
        final List<FeedResponse> feedResponses = mapFeedResponses(list);

        return FeedsResponse.of(feedResponses);
    }

    @Transactional(readOnly = true)
    public FeedsResponse reRead(final Long teamPlaceId, final Long feedId, final Integer size) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceIdAndIdLessThan(teamPlaceId, feedId, pageSize);
        final List<FeedResponse> feedResponses = mapFeedResponses(list);

        return FeedsResponse.of(feedResponses);
    }

    private Pageable getPageableInitSize(final Integer size) {
        return PageRequest.of(FIRST_PAGE, size, SORT_DIRECTION, SORT_CRITERIA);
    }

    private List<FeedResponse> mapFeedResponses(final List<Feed> feeds) {
        return feeds.stream().map(this::mapToResponse).toList();
    }

    private FeedResponse mapToResponse(Feed feed) {
        if (FeedType.THREAD == feed.getType()) {
            final Member member = memberRepository.findById(feed.getAuthorId())
                    .orElseThrow(MemberException.MemberNotFoundException::new);
            MemberIdAndDisplayNameOnly memberIdAndDisplayName = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(feed.getTeamPlaceId(), member.getId())
                    .orElseThrow(TeamPlaceException.TeamPlaceAccessForbidden::new);
            return FeedResponse.from(feed, memberIdAndDisplayName.displayMemberName().getValue(), member.getProfileImageUrl().getValue());
        }
        if (FeedType.NOTIFICATION == feed.getType()) {
            return FeedResponse.from(feed, "schedule", "");
        }
        throw new IllegalArgumentException("지원하지 않는 타입입니다.");
    }
}
