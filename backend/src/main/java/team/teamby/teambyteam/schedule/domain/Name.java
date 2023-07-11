package team.teamby.teambyteam.schedule.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class Name {

    @Column(name = "name", nullable = false)
    private String value;
}
