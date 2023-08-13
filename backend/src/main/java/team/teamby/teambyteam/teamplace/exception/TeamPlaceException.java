package team.teamby.teambyteam.teamplace.exception;

public class TeamPlaceException extends RuntimeException {

    public TeamPlaceException(final String message) {
        super(message);
    }

    public static class NameLengthException extends TeamPlaceException {
        public NameLengthException(final int allowedLength, final String inputValue) {
            super(String.format(
                    "팀 플레이스 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d }",
                    allowedLength,
                    inputValue.length())
            );
        }
    }

    public static class NameBlankException extends TeamPlaceException {

        public NameBlankException() {
            super("팀 플레이스 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

    public static class NotFoundException extends TeamPlaceException {

        public NotFoundException(final Long teamPlaceId) {
            super(String.format("조회한 팀 플레이스가 존재하지 않습니다. - request info { team_place_id : %d }", teamPlaceId));
        }
    }

    public static class TeamPlaceAccessForbidden extends TeamPlaceException {
        public TeamPlaceAccessForbidden(final Long teamPlaceId, final String memberEmail) {
            super(String.format(
                    "접근할 수 없는 팀플레이스입니다. - request info { team_place_id : %d, member_email : %s }",
                    teamPlaceId,
                    memberEmail)
            );
        }
    }
}
