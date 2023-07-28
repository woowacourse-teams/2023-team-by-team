package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.vo.Content;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FeedThread extends Feed {

    @Column(nullable = false)
    private Long authorId;

    public FeedThread(final Long teamPlaceId, final Content content, final Long authorId) {
        super(teamPlaceId, content);
        this.authorId = authorId;
    }

    @Override
    public FeedType getType() {
        return FeedType.THREAD;
    }
}
