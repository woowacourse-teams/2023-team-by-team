package team.teamby.teambyteam.teamplace.domain;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.teamplace.domain.vo.InviteCode;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public final class TeamPlaceInviteCode extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private InviteCode inviteCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_place_id")
    private TeamPlace teamPlace;

    public TeamPlaceInviteCode(final InviteCode inviteCode, final TeamPlace teamPlace) {
        this.inviteCode = inviteCode;
        this.teamPlace = teamPlace;
    }
}
