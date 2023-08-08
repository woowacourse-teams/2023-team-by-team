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
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.domain.vo.Name;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamPlaceService {

    private final MemberRepository memberRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    public TeamPlaceCreateResponse create(final MemberEmailDto memberEmailDto, final TeamPlaceCreateRequest request) {

        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final TeamPlace createdTeamPlace = teamPlaceRepository.save(new TeamPlace(new Name(request.name())));
        final MemberTeamPlace participatedMemberTeamPlace = member.participate(createdTeamPlace);

        memberTeamPlaceRepository.save(participatedMemberTeamPlace);

        return new TeamPlaceCreateResponse(createdTeamPlace.getId());
    }

}
