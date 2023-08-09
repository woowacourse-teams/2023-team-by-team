package team.teamby.teambyteam.token.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.domain.Member;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String refreshToken;

    public Token(final Member member, final String refreshToken) {
        this.member = member;
        this.refreshToken = refreshToken;
    }

    public void changeToken(final String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
