package team.teamby.teambyteam.feed.domain.image;

import org.springframework.data.jpa.repository.JpaRepository;
import team.teamby.teambyteam.feed.domain.FeedThread;

import java.util.List;

public interface FeedThreadImageRepository extends JpaRepository<FeedThreadImage, Long> {

    List<FeedThreadImage> findAllByFeedThread(final FeedThread feedThread);
}
