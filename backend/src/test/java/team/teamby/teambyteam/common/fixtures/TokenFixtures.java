package team.teamby.teambyteam.common.fixtures;

public class TokenFixtures {

    public static final String MALFORMED_JWT_TOKEN = "aabbcc";

    /**
     * WRONG_ACCESS_TOKEN
     */
    public static final String MISSING_CLAIM_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.BV61Y_kbsnUyvnTAgPwx-2ZK3saVYRI8t8s0P2Ji7P8";

    /**
     * WRONG_REFRESH_TOKEN
     */
    public static final String MISSING_CLAIM_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.KRcuHPgD8Cw84CPJ2xN6qc7lPVaUTptMgNPVZaR0x8Y";

    /**
     * CORRECT_REFRESH_TOKEN
     */
    public static final String CORRECT_REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6NDAwNDAzNDgwMH0.iXJeMmgyfuF5aRrK1X4bKjsq5AvRK9d0UFtVJbI7NZQ";
}
