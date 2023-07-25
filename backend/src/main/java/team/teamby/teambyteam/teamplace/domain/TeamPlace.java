package team.teamby.teambyteam.teamplace.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.vo.Email;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Name name;

    @OneToMany(mappedBy = "teamPlace", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<MemberTeamPlace> memberTeamPlaces;

    public TeamPlace(final Name name) {
        this.name = name;
        this.memberTeamPlaces = new ArrayList<>();
    }

    public boolean hasMemberByMemberEmail(final Email email) {
        return memberTeamPlaces.stream()
                .anyMatch(memberTeamPlace -> memberTeamPlace.getMember()
                        .getEmail()
                        .equals(email));
    }
}
