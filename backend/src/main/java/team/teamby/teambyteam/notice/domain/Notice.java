package team.teamby.teambyteam.notice.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.common.domain.BaseEntity;
import team.teamby.teambyteam.notice.domain.image.NoticeImage;
import team.teamby.teambyteam.notice.domain.vo.Content;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Content content;

    @Column(nullable = false, updatable = false)
    private Long teamPlaceId;

    @Column(nullable = false, updatable = false)
    private Long authorId;

    @OneToMany(mappedBy = "notice", fetch = FetchType.LAZY)
    private List<NoticeImage> images = new ArrayList<>();

    public Notice(final Content content, final Long teamPlaceId, final Long authorId) {
        this.content = content;
        this.teamPlaceId = teamPlaceId;
        this.authorId = authorId;
    }
}
