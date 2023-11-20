package team.teamby.teambyteam.icalendar.domain;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class IcalendarPublishCounter {

    private static final int MAX_PUBLISH_COUNT_PER_HOUR = 10;
    private static final int ZERO = 0;

    private final Map<Long, Integer> teamPlacePublishedCount = new ConcurrentHashMap<>();

    public void addCountFor(final Long teamPlaceId) {
        teamPlacePublishedCount.put(teamPlaceId, teamPlacePublishedCount.getOrDefault(teamPlaceId, ZERO) + 1);
    }

    public boolean isReachedToMaxCount(final Long teamPlaceId) {
        if (teamPlacePublishedCount.containsKey(teamPlaceId)) {
            return teamPlacePublishedCount.get(teamPlaceId) >= MAX_PUBLISH_COUNT_PER_HOUR;
        }
        return false;
    }

    public List<Long> getPublishDelayedTeamPlaceIds() {
        return teamPlacePublishedCount.entrySet()
                .stream()
                .filter(entry -> entry.getValue() >= MAX_PUBLISH_COUNT_PER_HOUR)
                .map(Map.Entry::getKey)
                .toList();
    }

    public void clearFor(final Long teamPlaceId) {
        teamPlacePublishedCount.remove(teamPlaceId);
    }

    public void clearAll() {
        teamPlacePublishedCount.clear();
    }
}
