package team.teamby.teambyteam.member.domain;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.member.domain.vo.DisplayMemberName;
import team.teamby.teambyteam.member.domain.vo.DisplayTeamPlaceName;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

@Getter
@Entity
@NoArgsConstructor
public class MemberTeamPlace extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private TeamPlace teamPlace;

    @Embedded
    private DisplayMemberName displayMemberName;

    @Embedded
    private DisplayTeamPlaceName displayTeamPlaceName;

    public void setMemberAndTeamPlace(final Member member, final TeamPlace teamPlace) {
        this.member = member;
        this.teamPlace = teamPlace;
        this.displayMemberName = new DisplayMemberName(member.getName().getValue());
        this.displayTeamPlaceName = new DisplayTeamPlaceName(teamPlace.getName().getValue());
        member.getMemberTeamPlaces().add(this);
        teamPlace.getMemberTeamPlaces().add(this);
    }
}
