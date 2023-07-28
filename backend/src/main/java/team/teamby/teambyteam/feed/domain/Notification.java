package team.teamby.teambyteam.feed.domain;

import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.vo.Content;

@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public abstract class Notification extends Feed {
    public Notification(final Long teamPlaceId, final Content content) {
        super(teamPlaceId, content);
    }
}
