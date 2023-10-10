package team.teamby.teambyteam.notice.domain.image;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.notice.domain.Notice;
import team.teamby.teambyteam.notice.domain.image.vo.ImageName;
import team.teamby.teambyteam.notice.domain.image.vo.ImageUrl;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class NoticeImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private Notice notice;

    @Embedded
    private ImageUrl imageUrl;

    @Embedded
    private ImageName imageName;

    public NoticeImage(final ImageUrl imageUrl, final ImageName imageName) {
        this.imageUrl = imageUrl;
        this.imageName = imageName;
    }

    public void confirmNotice(final Notice notice) {
        this.notice = notice;
        notice.getImages().add(this);
    }

    public String getImageUrlValue() {
        return imageUrl.getValue();
    }

    public String getImageNameValue() {
        return imageName.getValue();
    }
}
