package team.teamby.teambyteam.icalendar.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.icalendar.domain.vo.IcalendarFileName;
import team.teamby.teambyteam.icalendar.domain.vo.PublishUrl;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PublishedIcalendar extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false, unique = true)
    private Long teamPlaceId;

    @Embedded
    private IcalendarFileName icalendarFileName;

    @Embedded
    private PublishUrl publishUrl;

    public PublishedIcalendar(
            final Long teamPlaceId,
            final IcalendarFileName icalendarFileName,
            final PublishUrl publishUrl
    ) {
        this.teamPlaceId = teamPlaceId;
        this.icalendarFileName = icalendarFileName;
        this.publishUrl = publishUrl;
    }

    public String getIcalendarFileNameValue() {
        return icalendarFileName.getValue();
    }

    public String getPublishUrlValue() {
        return publishUrl.getValue();
    }
}
