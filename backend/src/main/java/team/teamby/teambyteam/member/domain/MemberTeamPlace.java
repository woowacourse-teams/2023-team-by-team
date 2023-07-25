package team.teamby.teambyteam.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

@Getter
@Entity
@AllArgsConstructor
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

    public MemberTeamPlace() {
    }

    public void setMemberAndTeamPlace(final Member member, final TeamPlace teamPlace) {
        this.member = member;
        this.teamPlace = teamPlace;
        member.getMemberTeamPlaces().add(this);
        teamPlace.getMemberTeamPlaces().add(this);
    }
}
