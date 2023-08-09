package team.teamby.teambyteam.teamplace.application;

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
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.domain.RandomInviteCodeGenerator;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCodeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.domain.vo.Name;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeException;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamPlaceService {

    private final MemberRepository memberRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final TeamPlaceInviteCodeRepository teamPlaceInviteCodeRepository;
    private final RandomInviteCodeGenerator randomInviteCodeGenerator;

    public TeamPlaceCreateResponse create(final MemberEmailDto memberEmailDto, final TeamPlaceCreateRequest request) {

        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final TeamPlace createdTeamPlace = teamPlaceRepository.save(new TeamPlace(new Name(request.name())));
        final MemberTeamPlace participatedMemberTeamPlace = member.participate(createdTeamPlace);

        memberTeamPlaceRepository.save(participatedMemberTeamPlace);

        return new TeamPlaceCreateResponse(createdTeamPlace.getId());
    }

    public TeamPlaceInviteCodeResponse getTeamPlaceInviteCode(final Long teamPlaceId) {
        final boolean exist = teamPlaceInviteCodeRepository.existsByTeamPlaceId(teamPlaceId);
        if (exist) {
            final InviteCode inviteCode = teamPlaceInviteCodeRepository.findByTeamPlaceId(teamPlaceId)
                    .orElseThrow(TeamPlaceInviteCodeException.NotGeneratedInviteCodeException::new)
                    .getInviteCode();
            return new TeamPlaceInviteCodeResponse(teamPlaceId, inviteCode.getValue());
        }
        final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId).orElseThrow(TeamPlaceException.NotFoundException::new);
        final InviteCode inviteCode = generateInviteCode();
        final TeamPlaceInviteCode teamPlaceInviteCode = teamPlaceInviteCodeRepository.save(new TeamPlaceInviteCode(inviteCode, teamPlace));
        return new TeamPlaceInviteCodeResponse(teamPlaceId, teamPlaceInviteCode.getInviteCode().getValue());
    }

    private InviteCode generateInviteCode() {
        String generated = "";
        boolean exists = true;
        do {
            generated = randomInviteCodeGenerator.generateRandomString();
            exists = teamPlaceInviteCodeRepository.existsByInviteCode(new InviteCode(generated));
        } while (exists);

        return new InviteCode(generated);
    }
}
