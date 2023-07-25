package team.teamby.teambyteam.member.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

@Getter
@Entity
@NoArgsConstructor
public class MemberTeamPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private TeamPlace teamPlace;

    public void setMemberAndTeamPlace(final Member member, final TeamPlace teamPlace) {
        this.member = member;
        this.teamPlace = teamPlace;
        member.getMemberTeamPlaces().add(this);
        teamPlace.getMemberTeamPlaces().add(this);
    }
}
