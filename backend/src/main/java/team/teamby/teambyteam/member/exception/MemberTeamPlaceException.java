package team.teamby.teambyteam.member.exception;

public class MemberTeamPlaceException extends RuntimeException {

    public MemberTeamPlaceException(final String message) {
        super(message);
    }

    public static class MemberDisplayNameLengthException extends MemberTeamPlaceException {
        public MemberDisplayNameLengthException(final int allowedLength, final String inputValue) {
            super(String.format(
                    "멤버 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d",
                    allowedLength,
                    inputValue.length())
            );
        }
    }

    public static class MemberNameBlankException extends MemberTeamPlaceException {
        public MemberNameBlankException() {
            super("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

    public static class TeamPlaceDisplayNameLengthException extends MemberTeamPlaceException {
        public TeamPlaceDisplayNameLengthException(final int allowedLength, final String inputValue) {
            super(String.format(
                    "팀플레이스의 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_length : %d",
                    allowedLength,
                    inputValue.length()));
        }
    }

    public static class TeamPlaceNameBlankException extends MemberTeamPlaceException {
        public TeamPlaceNameBlankException() {
            super("팀플레이스의 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

    public static class NotFoundParticipatedTeamPlaceException extends MemberTeamPlaceException {
        public NotFoundParticipatedTeamPlaceException(final String memberEmail, final Long teamPlaceId) {
            super(String.format(
                    "해당 팀 플레이스에 가입되어 있지 않습니다. - request info { member_email : %s, team_place_id : %d }",
                    memberEmail,
                    teamPlaceId)
            );
        }
    }

    public static class TeamPlaceColorNotExistException extends MemberTeamPlaceException {

        public TeamPlaceColorNotExistException(final int colorNumber) {
            super(String.format(
                    "존재하지 않는 팀 플레이스 색상입니다. - request info { team_place_color : %d }",
                    colorNumber
            ));
        }
    }
}
