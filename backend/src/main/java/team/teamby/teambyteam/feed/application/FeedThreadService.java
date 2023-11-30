package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.feed.application.dto.FeedImageResponse;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.feed.application.dto.FeedsResponse;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FeedThreadService {

    public static final String BLANK_PROFILE_IMAGE_URL = "";
    private static final String SORT_CRITERIA = "id";
    private static final Sort.Direction SORT_DIRECTION = Sort.Direction.DESC;
    private static final int FIRST_PAGE = 0;
    public static final String AUTHOR_NAME_SCHEDULE = "schedule";
    private static final int IMAGE_EXPIRATION_DATE = 90;

    private final Clock clock;

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Transactional(readOnly = true)
    public FeedsResponse firstRead(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final Integer size) {

        final List<FeedResponse> feedResponses = getFeedResponsesFromDatasource(teamPlaceId, memberEmailDto, size);

        return FeedsResponse.of(feedResponses);
    }

    private List<FeedResponse> getFeedResponsesFromDatasource(
            final Long teamPlaceId,
            final MemberEmailDto memberEmailDto,
            final Integer size
    ) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceId(teamPlaceId, pageSize);
        return mapFeedResponses(list, memberEmailDto.email(), teamPlaceId);
    }

    @Transactional(readOnly = true)
    public FeedsResponse reRead(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final Long feedId,
                                final Integer size) {
        final Pageable pageSize = getPageableInitSize(size);
        final List<Feed> list = feedRepository.findByTeamPlaceIdAndIdLessThan(teamPlaceId, feedId, pageSize);
        final List<FeedResponse> feedResponses = mapFeedResponses(list, memberEmailDto.email(), teamPlaceId);

        return FeedsResponse.of(feedResponses);
    }

    private Pageable getPageableInitSize(final Integer size) {
        return PageRequest.of(FIRST_PAGE, size, SORT_DIRECTION, SORT_CRITERIA);
    }

    private List<FeedResponse> mapFeedResponses(final List<Feed> feeds, final String loginMemberEmail,
                                                final Long teamPlaceId) {
        final Map<Long, MemberTeamPlace> teamPlaceMembers = getTeamPlaceMembers(teamPlaceId);
        return feeds.stream()
                .map(feed -> mapToResponse(
                        feed,
                        teamPlaceMembers.getOrDefault(feed.getAuthorId(), MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE),
                        loginMemberEmail))
                .toList();
    }

    private Map<Long, MemberTeamPlace> getTeamPlaceMembers(final Long teamPlaceId) {
        return memberTeamPlaceRepository.findAllByTeamPlaceId(teamPlaceId).stream()
                .collect(Collectors.toMap(
                        MemberTeamPlace::findMemberId,
                        memberTeamPlace -> memberTeamPlace
                ));
    }

    private FeedResponse mapToResponse(final Feed feed, final MemberTeamPlace author, final String loginMemberEmail) {
        if (FeedType.THREAD == feed.getType()) {
            return FeedResponse.from(feed, author, mapToFeedImageResponse((FeedThread) feed), loginMemberEmail);
        }
        if (FeedType.NOTIFICATION == feed.getType()) {
            return FeedResponse.from(feed, AUTHOR_NAME_SCHEDULE, BLANK_PROFILE_IMAGE_URL);
        }
        throw new IllegalArgumentException("지원하지 않는 타입입니다.");
    }

    private List<FeedImageResponse> mapToFeedImageResponse(final FeedThread feedThread) {
        final List<FeedThreadImage> images = feedThread.getImages();
        return images.stream().map(feedThreadImage ->
                        new FeedImageResponse(
                                feedThreadImage.getId(),
                                isExpired(feedThreadImage.getCreatedAt()),
                                feedThreadImage.getImageName().getValue(),
                                feedThreadImage.getImageUrl().getValue()))
                .toList();
    }

    private boolean isExpired(final LocalDateTime createdAt) {
        return createdAt.plusDays(IMAGE_EXPIRATION_DATE).isBefore(LocalDateTime.now(clock));
    }
}
