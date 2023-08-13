package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.token.domain.Token;

public class TokenFixtures {

    public static final String MALFORMED_JWT_TOKEN = "aabbcc";

    /**
     * WRONG_ACCESS_TOKEN
     */
    public static final String MISSING_CLAIM_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.BV61Y_kbsnUyvnTAgPwx-2ZK3saVYRI8t8s0P2Ji7P8";
    public static final String EXPIRED_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NTA0MDM0ODAwfQ.xyZsaxACnk-YsqCTyuohBt5FYEi80OcYhfbQZHJlVMA";

    /**
     * CORRECT_ACCESS_TOKEN
     */
    public static final String CORRECT_REISSUE_PHILIP_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBpaWx5YW5nLmRldkBnbWFpbC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.9I1ZGT9ysYGApyduuq6vMOoRFbB_VZTBrCSa49oPO5I";

    /**
     * WRONG_REFRESH_TOKEN
     */
    public static final String MISSING_CLAIM_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.KRcuHPgD8Cw84CPJ2xN6qc7lPVaUTptMgNPVZaR0x8Y";
    public static final String EXPIRED_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NTA0MDM0ODAwfQ.nB-JAqyiAd0CrQCiUCUjLiRw8GG4XokFCytN6p0ivaU";

    /**
     * CORRECT_REFRESH_TOKEN
     */
    public static final String CORRECT_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.iXJeMmgyfuF5aRrK1X4bKjsq5AvRK9d0UFtVJbI7NZQ";
    public static final String CORRECT_ORIGINAL_PHILIP_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBpaWx5YW5nLmRldkBnbWFpbC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.pl5hFuqjcIe3U5SIpui9peVfvBc6ukMV73_aPshz7Fk";
    public static final String CORRECT_REISSUE_PHILIP_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBpaWx5YW5nLmRldkBnbWFpbC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.pl5hFuqjcIe3U5SIpui9peVfvBc6ukMV73_aPshz7Fk";


    /**
     * Entity
     */
    public static Token TOKEN_ENTITY(final Member member, final String refreshToken) {
        return new Token(member, refreshToken);
    }
}
