package team.teamby.teambyteam.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.application.dto.TeamPlacesResponse;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.IdOnly;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Transactional(readOnly = true)
    public TeamPlacesResponse getParticipatedTeamPlaces(final MemberEmailDto memberEmailDto) {
        final IdOnly memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final List<MemberTeamPlace> allByMemberId = memberTeamPlaceRepository.findAllByMemberId(memberId.id());

        return TeamPlacesResponse.of(allByMemberId);
    }

}
