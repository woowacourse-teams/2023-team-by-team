package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
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

    @OneToMany(mappedBy = "feedThread")
    private final List<FeedThreadImage> images = new ArrayList<>();

    public FeedThread(final Long teamPlaceId, final Content content, final Long authorId) {
        super(teamPlaceId, content);
        this.authorId = authorId;
    }

    @Override
    public FeedType getType() {
        return FeedType.THREAD;
    }

    @Override
    public Long getAuthorId() {
        return this.authorId;
    }
}
