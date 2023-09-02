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
import team.teamby.teambyteam.member.exception.MemberTeamPlaceException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    public static final String UNKNOWN_MEMBER_NAME = "(알수없음)";
    public static final String UNKNOWN_MEMBER_EMAIL = "unknown@teamby.team";
    public static final String UNKNOWN_MEMBER_PROFILE_URL = "";
    public static final Member UNKNOWN_MEMBER = new Member(UNKNOWN_MEMBER_NAME, UNKNOWN_MEMBER_EMAIL, UNKNOWN_MEMBER_PROFILE_URL);

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

    public MemberTeamPlace participate(final TeamPlace teamPlace) {

        final MemberTeamPlace memberTeamPlace = new MemberTeamPlace();

        memberTeamPlace.setMemberAndTeamPlace(this, teamPlace);

        return memberTeamPlace;
    }

    public List<TeamPlace> getTeamPlaces() {
        return getMemberTeamPlaces().stream()
                .map(MemberTeamPlace::getTeamPlace)
                .toList();
    }

    public boolean isMemberOf(final Long targetTeamPlaceId) {
        return getMemberTeamPlaces().stream()
                .mapToLong(memberTeamPlace -> memberTeamPlace.getTeamPlace().getId())
                .anyMatch(teamPlaceId -> teamPlaceId == targetTeamPlaceId);
    }

    public MemberTeamPlace leaveTeamPlace(final Long teamPlaceId) {
        final MemberTeamPlace teamPlaceToLeave = memberTeamPlaces.stream()
                .filter(memberTeamPlace -> memberTeamPlace.getTeamPlace().getId().equals(teamPlaceId))
                .findAny()
                .orElseThrow(() ->
                        new MemberTeamPlaceException.NotFoundParticipatedTeamPlaceException(this.email.getValue(), teamPlaceId)
                );

        memberTeamPlaces.remove(teamPlaceToLeave);
        return teamPlaceToLeave;
    }

    public void changeName(final String nameToUpdate) {
        this.name = name.change(nameToUpdate);
    }
}
