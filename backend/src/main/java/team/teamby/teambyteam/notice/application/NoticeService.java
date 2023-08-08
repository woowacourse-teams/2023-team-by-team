package team.teamby.teambyteam.notice.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException.MemberNotFoundException;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.notice.domain.vo.Content;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    public Long register(final NoticeRegisterRequest noticeRegisterRequest,
                         final Long teamPlaceId,
                         final MemberEmailDto memberEmailDto
    ) {
        checkTeamPlaceExist(teamPlaceId);
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberNotFoundException::new);

        final Content content = new Content(noticeRegisterRequest.content());
        final Notice savedNotice = noticeRepository.save(new Notice(content, teamPlaceId, memberId.id()));

        return savedNotice.getId();
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new TeamPlaceException.NotFoundException();
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
    }

    @Transactional(readOnly = true)
    public Optional<NoticeResponse> findMostRecentNotice(final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        return noticeRepository.findMostRecentByTeamPlaceId(teamPlaceId)
                .flatMap(findNotice ->
                        memberTeamPlaceRepository.findById(findNotice.getAuthorId())
                                .map(memberTeamPlace -> NoticeResponse.of(findNotice, memberTeamPlace))
                );
    }
}
