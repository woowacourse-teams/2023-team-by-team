package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.global.domain.BaseEntity;

@DiscriminatorColumn(name = "type")
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public abstract class Feed extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Long teamPlaceId;

    @Embedded
    @Column(nullable = false)
    private Content content;

    public Feed(final Long teamPlaceId, final Content content) {
        this.teamPlaceId = teamPlaceId;
        this.content = content;
    }

    public abstract FeedType getType();
}
