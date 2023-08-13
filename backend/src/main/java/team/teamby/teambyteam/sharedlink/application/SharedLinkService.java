package team.teamby.teambyteam.sharedlink.application;

import lombok.RequiredArgsConstructor;
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

    public Long create(MemberEmailDto memberEmailDto, final Long teamPlaceId, final SharedLinkCreateRequest sharedLinkCreateRequest) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);
        final SharedLink sharedLink = new SharedLink(teamPlaceId, member.getId(), new Title(sharedLinkCreateRequest.title()), new SharedURL(sharedLinkCreateRequest.url()));
        final SharedLink saved = sharedLinkRepository.save(sharedLink);

        return saved.getId();
    }

    @Transactional(readOnly = true)
    public List<SharedLinkResponse> getLinks(final Long teamPlaceId) {
        final List<SharedLink> sharedLinks = sharedLinkRepository.findAllByTeamPlaceId(teamPlaceId);
        final List<SharedLinkResponse> sharedLinkResponses = sharedLinks.stream()
                .map(sharedLink ->
                        SharedLinkResponse.of(sharedLink, memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(sharedLink.getTeamPlaceId(), sharedLink.getMemberId()).orElse(MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE).getDisplayMemberName().getValue())).toList();
        return sharedLinkResponses;
    }

    public void deleteLink(final Long teamPlaceId, final Long sharedLinkId) {
        final SharedLink sharedLink = sharedLinkRepository.findById(sharedLinkId)
                .orElseThrow(SharedLinkException.NotFoundException::new);
        sharedLink.validateOwnerTeamPlace(teamPlaceId);

        sharedLinkRepository.delete(sharedLink);
    }
}
