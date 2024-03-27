package team.teamby.teambyteam.sharedlink.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.common.domain.BaseEntity;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class SharedLink extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Long teamPlaceId;

    @Column(nullable = false, updatable = false)
    private Long memberId;

    @Embedded
    private Title title;

    @Embedded
    private SharedURL sharedURL;

    public SharedLink(final Long teamPlaceId, final Long memberId, final Title title, final SharedURL sharedURL) {
        this.teamPlaceId = teamPlaceId;
        this.memberId = memberId;
        this.title = title;
        this.sharedURL = sharedURL;
    }

    public void validateOwnerTeamPlace(final Long teamPlaceId) {
        if (teamPlaceId.equals(this.teamPlaceId)) {
            return;
        }
        throw new SharedLinkException.OwnerForbiddenException(teamPlaceId, id);
    }
}
