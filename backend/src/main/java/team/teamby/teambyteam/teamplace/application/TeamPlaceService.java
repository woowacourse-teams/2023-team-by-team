package team.teamby.teambyteam.teamplace.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.TeamPlaceColor;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.member.exception.memberteamplace.NotFoundParticipatedTeamPlaceException;
import team.teamby.teambyteam.teamplace.application.dto.DisplayMemberNameChangeRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceChangeColorRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceInviteCodeResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMemberResponse;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceMembersResponse;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;
import team.teamby.teambyteam.teamplace.domain.RandomInviteCodeGenerator;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCode;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceInviteCodeRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;
import team.teamby.teambyteam.teamplace.domain.vo.Name;
import team.teamby.teambyteam.teamplace.exception.invitecode.TeamPlaceInviteCodeException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNotFoundException;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TeamPlaceService {

    private final ApplicationEventPublisher applicationEventPublisher;
    private final MemberRepository memberRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;
    private final TeamPlaceInviteCodeRepository teamPlaceInviteCodeRepository;
    private final RandomInviteCodeGenerator randomInviteCodeGenerator;

    public TeamPlaceCreateResponse create(final MemberEmailDto memberEmailDto, final TeamPlaceCreateRequest request) {

        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberNotFoundException(memberEmailDto.email()));

        final TeamPlace createdTeamPlace = teamPlaceRepository.save(new TeamPlace(new Name(request.name())));
        final MemberTeamPlace participatedMemberTeamPlace = member.participate(createdTeamPlace);

        memberTeamPlaceRepository.save(participatedMemberTeamPlace);

        log.info("팀플레이스 생성 - 팀플레이스 아이디 : {}, 생성한 사용자 이메일 : {}", createdTeamPlace.getId(), memberEmailDto.email());
        applicationEventPublisher.publishEvent(new TeamPlaceCreatedEvent(createdTeamPlace.getId()));
        return new TeamPlaceCreateResponse(createdTeamPlace.getId());
    }

    public TeamPlaceInviteCodeResponse getTeamPlaceInviteCode(final Long teamPlaceId) {
        final boolean exist = teamPlaceInviteCodeRepository.existsByTeamPlaceId(teamPlaceId);
        if (exist) {
            final InviteCode inviteCode = teamPlaceInviteCodeRepository.findByTeamPlaceId(teamPlaceId)
                    .orElseThrow(() -> new TeamPlaceInviteCodeException.NotGeneratedInviteCodeException(teamPlaceId))
                    .getInviteCode();
            return new TeamPlaceInviteCodeResponse(teamPlaceId, inviteCode.getValue());
        }
        final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId)
                .orElseThrow(() -> new TeamPlaceNotFoundException(teamPlaceId));
        final InviteCode inviteCode = generateInviteCode();
        final TeamPlaceInviteCode teamPlaceInviteCode = teamPlaceInviteCodeRepository.save(new TeamPlaceInviteCode(inviteCode, teamPlace));

        log.info("팀플레이스 초대 코드 생성 - 팀플레이스 아이디 : {}, 생성된 초대코드 : {}", teamPlaceId, inviteCode);
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

    @Transactional(readOnly = true)
    public TeamPlaceMembersResponse findMembers(final Long teamPlaceId, final MemberEmailDto memberEmailDto) {
        final Member loginMember = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberNotFoundException(memberEmailDto.email()));
        final List<MemberTeamPlace> memberTeamPlaces = memberTeamPlaceRepository.findAllByTeamPlaceId(teamPlaceId);

        final List<TeamPlaceMemberResponse> teamPlaceMembers = memberTeamPlaces.stream()
                .map(memberTeamPlace -> TeamPlaceMemberResponse.of(memberTeamPlace, loginMember))
                .toList();

        return TeamPlaceMembersResponse.from(teamPlaceMembers);
    }

    public void changeMemberTeamPlaceColor(final MemberEmailDto memberEmailDto,
                                           final Long teamPlaceId,
                                           final TeamPlaceChangeColorRequest request) {
        final String memberEmail = memberEmailDto.email();
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmail))
                .orElseThrow(() -> new MemberNotFoundException(memberEmail));

        final MemberTeamPlace memberTeamPlace = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlaceId, memberId.id())
                .orElseThrow(() -> new NotFoundParticipatedTeamPlaceException(memberEmail, teamPlaceId));

        final TeamPlaceColor findTeamPlaceColor = TeamPlaceColor.findTeamPlaceColor(request.teamPlaceColor());
        memberTeamPlace.changeTeamPlaceColor(findTeamPlaceColor);
    }

    public void changeDisplayMemberName(
            final Long teamPlaceId,
            final DisplayMemberNameChangeRequest request,
            final MemberEmailDto memberEmailDto
    ) {
        final String memberEmail = memberEmailDto.email();

        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmail))
                .orElseThrow(() -> new MemberNotFoundException(memberEmail));
        final MemberTeamPlace memberTeamPlace = memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlaceId, memberId.id())
                .orElseThrow(() -> new NotFoundParticipatedTeamPlaceException(memberEmail, teamPlaceId));

        memberTeamPlace.changeDisplayMemberName(new DisplayMemberName(request.name()));
    }
}
