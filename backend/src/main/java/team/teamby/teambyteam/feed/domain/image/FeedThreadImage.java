package team.teamby.teambyteam.feed.domain.image;

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
import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.image.vo.ImageName;
import team.teamby.teambyteam.feed.domain.image.vo.ImageUrl;
import team.teamby.teambyteam.global.domain.BaseEntity;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FeedThreadImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private FeedThread feedThread;

    @Embedded
    private ImageUrl imageUrl;

    @Embedded
    private ImageName imageName;

    private boolean isExpired;

    public FeedThreadImage(final ImageUrl imageUrl, final ImageName imageName) {
        this.imageUrl = imageUrl;
        this.imageName = imageName;
        this.isExpired = false;
    }

    public void confirmFeedThread(final FeedThread feedThread) {
        this.feedThread = feedThread;
        feedThread.getImages().add(this);
    }
}
