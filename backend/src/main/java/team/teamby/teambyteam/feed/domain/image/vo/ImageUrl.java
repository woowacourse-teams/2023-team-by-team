package team.teamby.teambyteam.feed.domain.image.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor
public class ImageUrl {

    @Column(name = "image_url", nullable = false, updatable = false)
    private String value;

    public ImageUrl(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String imageUrl) {
        if (Objects.isNull(imageUrl)) {
            throw new NullPointerException("이미지 Url은 null일 수 없습니다.");
        }
    }
}
