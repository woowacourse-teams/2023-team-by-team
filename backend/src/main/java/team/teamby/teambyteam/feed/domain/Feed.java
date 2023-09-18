package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
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
    private Content content;

    public Feed(final Long teamPlaceId, final Content content) {
        this.teamPlaceId = teamPlaceId;
        this.content = content;
    }

    public abstract FeedType getType();

    public abstract Long getAuthorId();
}
