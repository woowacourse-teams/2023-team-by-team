package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.icalendar.domain.IcalendarFileName;
import team.teamby.teambyteam.icalendar.domain.PublishUrl;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;

public class PublishedIcalendarFixtures {

    public static PublishedIcalendar TEST_ICALENDAR(final long teamPlaceId) {
        return new PublishedIcalendar(teamPlaceId, new IcalendarFileName(teamPlaceId + "-test.ics"), new PublishUrl("https://test.com/test.ics"));
    }
}
