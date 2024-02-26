package team.teamby.teambyteam.feed.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.exception.FeedException;

import java.util.Objects;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor
public class Content {

    public static final int MAX_LENGTH = 10000;

    @Column(name = "content", columnDefinition = "text")
    private String value;

    public Content(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("피드 내용은 null일 수 없습니다.");
        }
        if (value.length() > MAX_LENGTH) {
            throw new FeedException.ContentLengthException(MAX_LENGTH, value);
        }
    }
}
