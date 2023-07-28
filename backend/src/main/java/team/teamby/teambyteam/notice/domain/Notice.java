package team.teamby.teambyteam.notice.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.notice.domain.vo.Content;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Embedded
    private Content content;

    @Column(nullable = false, updatable = false)
    private Long teamPlaceId;

    @Column(nullable = false, updatable = false)
    private Long authorId;

    public Notice(final Content content, final Long teamPlaceId, final Long authorId) {
        this.content = content;
        this.teamPlaceId = teamPlaceId;
        this.authorId = authorId;
    }
}
