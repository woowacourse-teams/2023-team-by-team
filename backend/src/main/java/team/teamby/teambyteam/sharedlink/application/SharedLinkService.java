package team.teamby.teambyteam.sharedlink.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkResponse;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinksResponse;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.SharedLinkRepository;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkNotFoundException;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SharedLinkService {

    private final MemberRepository memberRepository;
    private final SharedLinkRepository sharedLinkRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    public Long create(final MemberEmailDto memberEmailDto, final Long teamPlaceId, final SharedLinkCreateRequest sharedLinkCreateRequest) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberNotFoundException(memberEmailDto.email()));
        final SharedLink sharedLink = new SharedLink(teamPlaceId, member.getId(), new Title(sharedLinkCreateRequest.title()), new SharedURL(sharedLinkCreateRequest.url()));
        final SharedLink saved = sharedLinkRepository.save(sharedLink);
        log.info("공유 링크 등록 - 팀플레이스 아이디 : {}, 공유 링크 아이디 : {}", teamPlaceId, saved.getId());

        return saved.getId();
    }

    @Transactional(readOnly = true)
    public SharedLinksResponse getLinks(final Long teamPlaceId) {
        final List<SharedLink> sharedLinks = sharedLinkRepository.findAllByTeamPlaceId(teamPlaceId);
        final List<SharedLinkResponse> sharedLinkResponses = sharedLinks.stream()
                .map(this::mapToSharedLinkResponse)
                .toList();

        return SharedLinksResponse.of(sharedLinkResponses);
    }

    private SharedLinkResponse mapToSharedLinkResponse(final SharedLink sharedLink) {
        final MemberTeamPlace memberTeamPlace = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(sharedLink.getTeamPlaceId(), sharedLink.getMemberId())
                .orElse(MemberTeamPlace.UNKNOWN_MEMBER_TEAM_PLACE);

        return SharedLinkResponse.of(sharedLink, memberTeamPlace);
    }

    public void deleteLink(final Long teamPlaceId, final Long sharedLinkId) {
        final SharedLink sharedLink = sharedLinkRepository.findById(sharedLinkId)
                .orElseThrow(() -> new SharedLinkNotFoundException(sharedLinkId));
        sharedLink.validateOwnerTeamPlace(teamPlaceId);
        sharedLinkRepository.delete(sharedLink);
        log.info("공유 링크 삭제 - 팀플레이스 아이디 : {}, 공유 링크 아이디 : {}", teamPlaceId, sharedLinkId);
    }
}
