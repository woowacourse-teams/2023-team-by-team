package team.teamby.teambyteam.sharedlink.application;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.sharedlink.domain.SharedLinkRepository;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;

@Service
@Transactional
@RequiredArgsConstructor
public class SharedLinkService {

    private final MemberRepository memberRepository;
    private final SharedLinkRepository sharedLinkRepository;

    public Long create(MemberEmailDto memberEmailDto, final Long teamPlaceId, final @Valid SharedLinkCreateRequest sharedLinkCreateRequest) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);
        final SharedLink sharedLink = new SharedLink(teamPlaceId, member.getId(), new Title(sharedLinkCreateRequest.title()), new SharedURL(sharedLinkCreateRequest.url()));
        final SharedLink saved = sharedLinkRepository.save(sharedLink);

        return saved.getId();
    }
}
