package team.teamby.teambyteam.sharedlink.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SharedURL {

    @Column(nullable = false, name = "shared_url")
    private String value;

    public SharedURL(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (value.isBlank()) {
            throw new SharedLinkException.URLException();
        }
    }
}
