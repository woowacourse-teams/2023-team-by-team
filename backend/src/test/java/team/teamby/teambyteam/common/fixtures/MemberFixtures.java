package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.domain.vo.Name;
import team.teamby.teambyteam.member.domain.vo.ProfileImageUrl;

public class MemberFixtures {

    /**
     * NAME
     */
    public static final String PHILIP_NAME = "jae_philip_yang";
    public static final String ROY_NAME = "roy";
    public static final String SEONGHA_NAME = "seongha";
    public static final String ENDEL_NAME = "endel";

    /**
     * EMAIL
     */
    public static final String PHILIP_EMAIL = "piilyang.dev@gmail.com";
    public static final String ROY_EMAIL = "roy@gmail.com";
    public static final String SEONGHA_EMAIL = "seongha@naver.com";
    public static final String ENDEL_EMAIL = "abcd@gmail.com";

    /**
     * PROFILE_IMAGE_URL
     */
    public static final String PHILIP_PROFILE_IMAGE_URL = "/profile/philip.gif";
    public static final String ROY_PROFILE_IMAGE_URL = "/profile/roy.png";
    public static final String SEONGHA_PROFILE_IMAGE_URL = "/profile/seongha.png";
    public static final String ENDEL_PROFILE_IMAGE_URL = "/profile/endel.png";

    /**
     * REQUEST
     */
    public static final MemberEmailDto PHILIP_MEMBER_EMAIL_REQUEST = new MemberEmailDto(PHILIP_EMAIL);
    public static final MemberEmailDto ROY_MEMBER_EMAIL_REQUEST = new MemberEmailDto(ROY_EMAIL);
    public static final MemberEmailDto SEONGHA_MEMBER_EMAIL_REQUEST = new MemberEmailDto(SEONGHA_EMAIL);
    public static final MemberEmailDto ENDEL_MEMBER_EMAIL_REQUEST = new MemberEmailDto(ENDEL_EMAIL);

    /**
     * ENTITY
     */
    public static Member PHILIP() {
        return new Member(new Name(PHILIP_NAME), new Email(PHILIP_EMAIL), new ProfileImageUrl(PHILIP_PROFILE_IMAGE_URL));
    }

    public static Member ROY() {
        return new Member(new Name(ROY_NAME), new Email(ROY_EMAIL), new ProfileImageUrl(ROY_PROFILE_IMAGE_URL));
    }

    public static Member SEONGHA() {
        return new Member(new Name(SEONGHA_NAME), new Email(SEONGHA_EMAIL), new ProfileImageUrl(SEONGHA_PROFILE_IMAGE_URL));
    }

    public static Member ENDEL() {
        return new Member(new Name(ENDEL_NAME), new Email(ENDEL_EMAIL), new ProfileImageUrl(ENDEL_PROFILE_IMAGE_URL));
    }
}
