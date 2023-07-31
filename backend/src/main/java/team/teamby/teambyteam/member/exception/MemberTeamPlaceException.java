package team.teamby.teambyteam.member.exception;

public class MemberTeamPlaceException extends RuntimeException {

    public MemberTeamPlaceException(final String message) {
        super(message);
    }

    public static class MemberDisplayNameLengthException extends MemberTeamPlaceException {
        public MemberDisplayNameLengthException() {
            super("멤버 이름의 길이가 최대 이름 길이를 초과했습니다.");
        }
    }

    public static class MemberNameBlankException extends MemberTeamPlaceException {
        public MemberNameBlankException() {
            super("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

    public static class TeamPlaceDisplayNameLengthException extends MemberTeamPlaceException {
        public TeamPlaceDisplayNameLengthException() {
            super("팀플레이스의 이름의 길이가 최대 이름 길이를 초과했습니다.");
        }
    }

    public static class TeamPlaceNameBlankException extends MemberTeamPlaceException {
        public TeamPlaceNameBlankException() {
            super("팀플레이스의 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }
}
