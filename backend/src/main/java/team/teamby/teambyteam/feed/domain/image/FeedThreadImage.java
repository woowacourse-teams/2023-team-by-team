package team.teamby.teambyteam.feed.domain.image;

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
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.common.domain.BaseEntity;
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FeedThreadImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FeedThread feedThread;

    @Embedded
    private ImageUrl imageUrl;

    @Embedded
    private ImageName imageName;

    @Enumerated(EnumType.STRING)
    private Status status;

    public FeedThreadImage(final ImageUrl imageUrl, final ImageName imageName, final Status status) {
        this.imageUrl = imageUrl;
        this.imageName = imageName;
        this.status = status;
    }

    public void confirmFeedThread(final FeedThread feedThread) {
        this.feedThread = feedThread;
        feedThread.getImages().add(this);
    }

    public boolean isExpired() {
        return Status.EXPIRED.equals(status);
    }
}
