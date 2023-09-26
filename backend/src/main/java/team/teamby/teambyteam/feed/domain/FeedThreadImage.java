package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.vo.ImageName;
import team.teamby.teambyteam.feed.domain.vo.ImageUrl;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FeedThreadImage {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private FeedThread feedThread;

    @Embedded
    private ImageUrl imageUrl;

    @Embedded
    private ImageName imageName;

    public void confirmFeedThread(final FeedThread feedThread) {
        this.feedThread = feedThread;
        feedThread.getImages().add(this);
    }
}
