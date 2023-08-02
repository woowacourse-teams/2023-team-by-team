package team.teamby.teambyteam.member.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.domain.vo.Name;
import team.teamby.teambyteam.member.domain.vo.ProfileImageUrl;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Name name;

    @Embedded
    private Email email;

    @Embedded
    private ProfileImageUrl profileImageUrl;

    @Column
    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<MemberTeamPlace> memberTeamPlaces;

    public Member(
            final Name name,
            final Email email,
            final ProfileImageUrl profileImageUrl
    ) {
        this.name = name;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.memberTeamPlaces = new ArrayList<>();
    }

    public Member(
            final String name,
            final String email,
            final String profileImageUrl
    ) {
        this(new Name(name), new Email(email), new ProfileImageUrl(profileImageUrl));
    }

    public List<TeamPlace> getTeamPlaces() {
        return getMemberTeamPlaces().stream()
                .map(MemberTeamPlace::getTeamPlace)
                .toList();
    }

    public boolean isMemberOf(final Long targetTeamPlaceId) {
        return getMemberTeamPlaces().stream()
                .mapToLong(memberTeamPlace -> memberTeamPlace.getMember().getId())
                .anyMatch(teamPlaceId -> teamPlaceId == targetTeamPlaceId);
    }
}
