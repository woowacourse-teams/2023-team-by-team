package team.teamby.teambyteam.member.exception;

public class MemberException extends RuntimeException {

    public MemberException(final String message) {
        super(message);
    }

    public static class NameLengthException extends MemberException {

        public NameLengthException(final int allowedLength, final String inputName) {
            super(String.format(
                    "멤버 이름의 길이가 최대 이름 길이를 초과했습니다. - request info { allowed_length : %d, input_value_length : %d }",
                    allowedLength,
                    inputName.length())
            );
        }
    }

    public static class NameBlankException extends MemberException {

        public NameBlankException() {
            super("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
        }
    }

    public static class EmailRegexException extends MemberException {
        public EmailRegexException(final String inputEmail) {
            super(String.format("정해진 이메일의 양식이 아닙니다. - request info { email : %s }", inputEmail));
        }
    }

    public static class MemberNotFoundException extends MemberException {
        public MemberNotFoundException(final String email) {
            super(String.format("조회한 멤버가 존재하지 않습니다. - request info { email : %s }", email));
        }
    }
}
