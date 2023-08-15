package team.teamby.teambyteam.sharedlink.exception;

public class SharedLinkException extends RuntimeException {

    public SharedLinkException(final String message) {
        super(message);
    }

    public static class TitleBlankException extends SharedLinkException {
        public TitleBlankException() {
            super("공유 링크의 제목은 빈칸으로 구성될 수 없습니다.");
        }
    }

    public static class URLBlankException extends SharedLinkException {
        public URLBlankException() {
            super("공유 링크는 빈칸으로 구성될 수 없습니다.");
        }
    }

    public static class NotFoundException extends SharedLinkException {
        public NotFoundException(final Long sharedLinkId) {
            super(String.format("존재하지 않는 공유 링크입니다. - request info { sharedLinkId : %d }", sharedLinkId));
        }
    }

    public static class OwnerForbiddenException extends SharedLinkException {
        public OwnerForbiddenException(final Long teamPlaceId, final Long sharedLinkId) {
            super(String.format(
                    "팀플레이스에 소속되지 않은 공유링크입니다. - request info { team_place_id : %d, sharedLinkId : %d }",
                    teamPlaceId,
                    sharedLinkId)
            );
        }
    }
}
