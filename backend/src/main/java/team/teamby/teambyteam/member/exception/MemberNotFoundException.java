package team.teamby.teambyteam.member.exception;

import team.teamby.teambyteam.common.exception.CustomNotFondException;

public class MemberNotFoundException extends CustomNotFondException {
    public MemberNotFoundException(final String email) {
        super(String.format("조회한 멤버가 존재하지 않습니다. - request info { email : %s }", email));
    }
}
