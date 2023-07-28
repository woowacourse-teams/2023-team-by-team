package team.teamby.teambyteam.notice.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.notice.domain.vo.Content;
import team.teamby.teambyteam.notice.exception.NoticeException;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final MemberRepository memberRepository;

    public Long register(final NoticeRegisterRequest noticeRegisterRequest, final Long teamPlaceId, final Long authorId) {
        checkTeamPlaceExist(teamPlaceId);
        checkAuthorExist(authorId);

        final Content content = new Content(noticeRegisterRequest.content());
        final Notice savedNotice = noticeRepository.save(new Notice(content, teamPlaceId, authorId));

        return savedNotice.getId();
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new NoticeException.NotFoundTeamPlaceException();
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
    }

    private void checkAuthorExist(Long authorId) {
        if (notExistMember(authorId)) {
            throw new NoticeException.NotFoundMemberException();
        }
    }

    private boolean notExistMember(Long authorId) {
        return !memberRepository.existsById(authorId);
    }
}

