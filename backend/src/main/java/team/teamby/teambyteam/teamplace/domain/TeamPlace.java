package team.teamby.teambyteam.teamplace.domain;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.global.domain.BaseEntity;
import team.teamby.teambyteam.teamplace.domain.vo.Name;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeamPlace extends BaseEntity {

    public static final String UNKNOWN_TEAM_PLACE_NAME = "알수없음";
    public static final TeamPlace UNKNOWN_TEAM_PLACE = new TeamPlace(new Name(UNKNOWN_TEAM_PLACE_NAME));

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Name name;

    public TeamPlace(final Name name) {
        this.name = name;
    }
}
