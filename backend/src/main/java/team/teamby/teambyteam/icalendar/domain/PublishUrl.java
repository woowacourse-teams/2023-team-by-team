package team.teamby.teambyteam.icalendar.domain;

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
public class PublishUrl {

    private static final String URL_REGEX = "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$";

    @Column(name = "publish_url", nullable = false, unique = true, updatable = false)
    private String value;

    public PublishUrl(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("URL이 NULL로 입력되었습니다.");
        }
        if (value.isBlank()) {
            throw new IllegalArgumentException("URL로 공백이 입력되었습니다.");
        }
        if (!value.matches(URL_REGEX)) {
            throw new IllegalArgumentException("URL이 형식에 맞지 않습니다. 입력된 값 : " + value);
        }
    }
}
