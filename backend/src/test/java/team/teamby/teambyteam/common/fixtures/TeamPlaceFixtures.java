package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.vo.Name;

public class TeamPlaceFixtures {

    public static final String ENGLISH_TEAM_PLACE_NAME = "영어 팀플";
    public static final String JAPANESE_TEAM_PLACE_NAME = "일본어 팀플";

    public static TeamPlace ENGLISH_TEAM_PLACE() {
        return new TeamPlace(new Name(ENGLISH_TEAM_PLACE_NAME));
    }

    public static TeamPlace JAPANESE_TEAM_PLACE() {
        return new TeamPlace(new Name(JAPANESE_TEAM_PLACE_NAME));
    }
}
