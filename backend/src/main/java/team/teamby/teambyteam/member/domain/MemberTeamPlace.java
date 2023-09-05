package team.teamby.teambyteam.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Getter
@Entity
@NoArgsConstructor
public class MemberTeamPlace extends BaseEntity {

    public static final MemberTeamPlace UNKNOWN_MEMBER_TEAM_PLACE
            = new MemberTeamPlace(Member.UNKNOWN_MEMBER, TeamPlace.UNKNOWN_TEAM_PLACE);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private TeamPlace teamPlace;

    @Embedded
    private DisplayMemberName displayMemberName;

    @Embedded
    private DisplayTeamPlaceName displayTeamPlaceName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TeamPlaceColor teamPlaceColor;

    private MemberTeamPlace(final Member member, final TeamPlace teamPlace) {
        this.id = null;
        this.member = member;
        this.teamPlace = teamPlace;
        this.teamPlaceColor = null;

        this.displayMemberName = new DisplayMemberName(member.getName().getValue());
        this.displayTeamPlaceName = new DisplayTeamPlaceName(teamPlace.getName().getValue());
    }

    public void setMemberAndTeamPlace(final Member member, final TeamPlace teamPlace) {
        this.member = member;
        this.teamPlace = teamPlace;

        this.displayMemberName = new DisplayMemberName(member.getName().getValue());
        this.displayTeamPlaceName = new DisplayTeamPlaceName(teamPlace.getName().getValue());

        this.teamPlaceColor = selectTeamPlaceColor();

        member.getMemberTeamPlaces().add(this);
    }

    private TeamPlaceColor selectTeamPlaceColor() {
        final Map<TeamPlaceColor, Integer> existingColors = getParticipatedTeamColors();
        return Arrays.stream(TeamPlaceColor.values())
                .filter(color -> !existingColors.containsKey(color))
                .findFirst()
                .orElseGet(() -> getMinUsedColor(existingColors));
    }

    private Map<TeamPlaceColor, Integer> getParticipatedTeamColors() {
        final Map<TeamPlaceColor, Integer> existingColors = new HashMap<>();

        member.getMemberTeamPlaces().stream()
                .map(MemberTeamPlace::getTeamPlaceColor)
                .forEach(color -> existingColors.merge(color, 1, Integer::sum));

        return existingColors;
    }

    private TeamPlaceColor getMinUsedColor(final Map<TeamPlaceColor, Integer> existingColors) {
        return existingColors.entrySet()
                .stream()
                .min(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .get();
    }

    public void changeDisplayMemberName(final DisplayMemberName displayMemberName) {
        this.displayMemberName = displayMemberName;
    }

    public boolean isOwnedBy(final Member member) {
        return this.member.equals(member);
    }

    public Long findMemberId() {
        return member.getId();
    }

    public String findMemberName() {
        return member.getName().getValue();
    }

    public String findMemberProfileImageUrl() {
       return member.getProfileImageUrl().getValue();
    }

    public Long findTeamPlaceId() {
        return teamPlace.getId();
    }

    public boolean isDefaultDisplayMemberName(String defaultMemberName) {
        return this.displayMemberName.getValue().equals(defaultMemberName);
    }
}
