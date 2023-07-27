package team.teamby.teambyteam.notice.domain;

import jakarta.persistence.*;
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

    public Notice(final Content content, final Long teamPlaceId) {
        this.content = content;
        this.teamPlaceId = teamPlaceId;
    }
}
