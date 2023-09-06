package team.teamby.teambyteam.member.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.application.dto.MemberInfoResponse;
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

@Slf4j
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
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));

        final List<MemberTeamPlace> allByMemberId = memberTeamPlaceRepository.findAllByMemberId(memberId.id());

        return TeamPlacesResponse.of(allByMemberId);
    }

    public void leaveTeamPlace(final MemberEmailDto memberEmailDto, final Long teamPlaceId) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));

        final MemberTeamPlace memberTeamPlaceToLeave = member.leaveTeamPlace(teamPlaceId);
        memberTeamPlaceRepository.delete(memberTeamPlaceToLeave);

        log.info("사용자 팀플레이스 탈퇴 - 회원 이메일 : {}, 팀플레이스 아이디 : {}", memberEmailDto.email(), teamPlaceId);
    }

    public TeamPlaceParticipantResponse participateTeamPlace(final MemberEmailDto memberEmailDto, final String inviteCode) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));

        final InviteCode inviteCodeVo = validteInviteCode(inviteCode);
        final TeamPlaceInviteCode teamPlaceInviteCode = teamPlaceInviteCodeRepository.findByInviteCode(inviteCodeVo)
                .orElseThrow(() -> new TeamPlaceInviteCodeException.NotFoundException(inviteCodeVo.getValue()));
        final TeamPlace teamPlace = teamPlaceInviteCode.getTeamPlace();
        if (member.isMemberOf(teamPlace.getId())) {
            return new TeamPlaceParticipantResponse(teamPlace.getId());
        }

        final MemberTeamPlace participatedMemberTeamPlace = member.participate(teamPlace);
        memberTeamPlaceRepository.save(participatedMemberTeamPlace);

        log.info("사용자가 팀플레이스 참가 - 회원 이메일 : {}, 팀플레이스 아이디 : {}, 사용한 초대코드 : {}", memberEmailDto.email(), teamPlace.getId(), inviteCode);
        return new TeamPlaceParticipantResponse(teamPlace.getId());
    }

    private InviteCode validteInviteCode(final String inviteCode) {
        final InviteCode inviteCodeVo;
        try {
            inviteCodeVo = new InviteCode(inviteCode);
        } catch (IllegalArgumentException e) {
            throw new TeamPlaceInviteCodeException.LengthException(InviteCode.LENGTH, inviteCode);
        }
        return inviteCodeVo;
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse getMemberInformation(final MemberEmailDto memberEmailDto) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));

        return MemberInfoResponse.of(member);
    }

    public void leaveMember(final MemberEmailDto memberEmailDto) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()));
        memberRepository.delete(member);

        log.info("사용자 회원 탈퇴 - 회원 이메일 : {}", memberEmailDto.email());
    }
}
