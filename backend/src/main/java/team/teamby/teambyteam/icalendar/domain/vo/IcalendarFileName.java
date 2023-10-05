package team.teamby.teambyteam.icalendar.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
public class IcalendarFileName {

    private static final String EXTENSION_DELIMITER = ".";
    public static final String ICALENDAR_FILE_EXTENSION = "ics";
    public static final String FILE_NAME_DELIMITER = "-";

    @Column(name = "icalendar_file_name", nullable = false, unique = true, updatable = false)
    private String value;

    public IcalendarFileName(final String value) {
        validate(value);
        this.value = value;
    }

    public static IcalendarFileName generateRandomFileName(final Long teamPlaceId) {
        final StringBuilder nameBuilder = new StringBuilder();
        final String randomName = nameBuilder.append(teamPlaceId)
                .append(FILE_NAME_DELIMITER)
                .append(UUID.randomUUID())
                .append(EXTENSION_DELIMITER)
                .append(ICALENDAR_FILE_EXTENSION)
                .toString();
        return new IcalendarFileName(randomName);
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("저장된 파일 명이 NULL로 입력되었습니다.");
        }
        if (value.isBlank()) {
            throw new IllegalArgumentException("ics파일명으로 공백이 입력되었습니다.");
        }
        if (!value.endsWith(EXTENSION_DELIMITER + ICALENDAR_FILE_EXTENSION)) {
            throw new IllegalArgumentException("ics파일의 확장자가 맞지 않습니다. 입력된 파일 명 : " + value);
        }
    }
}
