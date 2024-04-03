package team.teamby.teambyteam.member.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import team.teamby.teambyteam.member.exception.memberteamplace.TeamPlaceColorNotExistException;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum TeamPlaceColor {

    A(0),
    B(1),
    C(2),
    D(3),
    E(4),
    F(5),
    G(6),
    H(7),
    I(8),
    J(9);

    private final int colorNumber;

    public static TeamPlaceColor findTeamPlaceColor(int colorNumber) {
        return Arrays.stream(values())
                .filter(teamPlaceColor -> teamPlaceColor.colorNumber == colorNumber)
                .findAny()
                .orElseThrow(() -> new TeamPlaceColorNotExistException(colorNumber));
    }
}
