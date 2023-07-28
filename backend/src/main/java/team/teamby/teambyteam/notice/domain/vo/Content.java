package team.teamby.teambyteam.notice.domain.vo;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.notice.exception.NoticeException;

import java.util.Objects;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content {

    public static final int MAX_LENGTH = 10000;

    @Column(name = "content", nullable = false)
    @Lob
    private String value;

    public Content(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("공지 내용은 null일 수 없습니다.");
        }
        if (value.length() > MAX_LENGTH) {
            throw new NoticeException.ContentLengthException();
        }
    }
}
