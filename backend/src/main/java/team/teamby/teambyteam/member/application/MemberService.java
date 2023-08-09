package team.teamby.teambyteam.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceParticipantResponse;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCodeRepository;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeException;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final TeamPlaceInviteCodeRepository teamPlaceInviteCodeRepository;

    @Transactional(readOnly = true)
    public TeamPlacesResponse getParticipatedTeamPlaces(final MemberEmailDto memberEmailDto) {
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final List<MemberTeamPlace> allByMemberId = memberTeamPlaceRepository.findAllByMemberId(memberId.id());

        return TeamPlacesResponse.of(allByMemberId);
    }

    public TeamPlaceParticipantResponse participateTeamPlace(final MemberEmailDto memberEmailDto, final String inviteCode) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);
        final TeamPlaceInviteCode teamPlaceInviteCode = teamPlaceInviteCodeRepository.findByInviteCode(new InviteCode(inviteCode))
                .orElseThrow(TeamPlaceInviteCodeException.NotFoundException::new);
        final TeamPlace teamPlace = teamPlaceInviteCode.getTeamPlace();
        if (member.isMemberOf(teamPlace.getId())) {
            return new TeamPlaceParticipantResponse(teamPlace.getId());
        }

        final MemberTeamPlace participatedMemberTeamPlace = member.participate(teamPlace);
        memberTeamPlaceRepository.save(participatedMemberTeamPlace);

        return new TeamPlaceParticipantResponse(teamPlace.getId());
    }
}
