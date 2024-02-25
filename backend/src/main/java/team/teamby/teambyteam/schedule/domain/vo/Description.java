package team.teamby.teambyteam.schedule.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
public class Description {

    @Column(name = "description", nullable = true)
    private String value;

    public Description(final String value) {
        if (Objects.isNull(value) || value.isBlank()) {
            this.value = null;
            return;
        }
        this.value = value.trim();
    }

    public boolean isExist() {
        return Objects.nonNull(value);
    }
}
