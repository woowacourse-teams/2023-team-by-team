package team.teamby.teambyteam.feed.domain.image.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Objects;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor
public class ImageName {

    @Column(name = "image_name", nullable = false, updatable = false)
    private String value;

    public ImageName(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String imageName) {
        if (Objects.isNull(imageName)) {
            throw new NullPointerException("이미지 이름은 null일 수 없습니다.");
        }
    }
}
