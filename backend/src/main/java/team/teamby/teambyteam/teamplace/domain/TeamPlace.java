package team.teamby.teambyteam.teamplace.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;

import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeamPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Name name;

    @OneToMany(mappedBy = "teamPlace", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<MemberTeamPlace> memberTeamPlaces;

    public TeamPlace(final Name name, final List<MemberTeamPlace> memberTeamPlaces) {
        this.name = name;
        this.memberTeamPlaces = memberTeamPlaces;
    }
}
