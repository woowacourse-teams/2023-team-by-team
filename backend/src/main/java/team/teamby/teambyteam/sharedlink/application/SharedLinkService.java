package team.teamby.teambyteam.sharedlink.application;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkResponse;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinksResponse;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkCreateEvent;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkDeleteEvent;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.SharedLinkRepository;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SharedLinkService {

    private final MemberRepository memberRepository;
    private final SharedLinkRepository sharedLinkRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final ApplicationEventPublisher eventPublisher;

    public Long create(final MemberEmailDto memberEmailDto, final Long teamPlaceId, final SharedLinkCreateRequest sharedLinkCreateRequest) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));
        final SharedLink sharedLink = new SharedLink(teamPlaceId, member.getId(), new Title(sharedLinkCreateRequest.title()), new SharedURL(sharedLinkCreateRequest.url()));
        final SharedLink saved = sharedLinkRepository.save(sharedLink);

        eventPublisher.publishEvent(new SharedLinkCreateEvent(saved.getId(), teamPlaceId, saved.getTitle(), saved.getSharedURL()));

        return saved.getId();
    }

    @Transactional(readOnly = true)
    public SharedLinksResponse getLinks(final Long teamPlaceId) {
        final List<SharedLink> sharedLinks = sharedLinkRepository.findAllByTeamPlaceId(teamPlaceId);
        final List<SharedLinkResponse> sharedLinkResponses = sharedLinks.stream()
                .map(this::mapToSharedLinkResponse).toList();

        return SharedLinksResponse.of(sharedLinkResponses);
    }

    private SharedLinkResponse mapToSharedLinkResponse(final SharedLink sharedLink) {
        final MemberTeamPlace memberTeamPlace = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(sharedLink.getTeamPlaceId(), sharedLink.getMemberId())
                .orElse(MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE);

        return SharedLinkResponse.of(sharedLink, memberTeamPlace);
    }

    public void deleteLink(final Long teamPlaceId, final Long sharedLinkId) {
        final SharedLink sharedLink = sharedLinkRepository.findById(sharedLinkId)
                .orElseThrow(SharedLinkException.NotFoundException::new);
        sharedLink.validateOwnerTeamPlace(teamPlaceId);

        eventPublisher.publishEvent(new SharedLinkDeleteEvent(sharedLinkId, teamPlaceId, sharedLink.getTitle(), sharedLink.getSharedURL()));

        sharedLinkRepository.delete(sharedLink);
    }
}