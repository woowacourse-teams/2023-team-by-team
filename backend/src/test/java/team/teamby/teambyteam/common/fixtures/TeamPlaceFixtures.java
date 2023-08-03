package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.vo.Name;

public class TeamPlaceFixtures {

    public static final String ENGLISH_TEAM_PLACE_NAME = "영어 팀플";
    public static final String JAPANESE_TEAM_PLACE_NAME = "일본어 팀플";
    public static final String FLUID_TEAM_PLACE_NAME = "유체역학 팀플";
    public static final String STATICS_TEAM_PLACE_NAME = "정역학 팀플";
    public static final String DYNAMICS_TEAM_PLACE_NAME = "동역학 팀플";
    public static final String CONTROLS_TEAM_PLACE_NAME = "제어공학 팀플";
    public static final String MATERIALS_TEAM_PLACE_NAME = "제료공학 팀플";

    public static TeamPlace ENGLISH_TEAM_PLACE() {
        return new TeamPlace(new Name(ENGLISH_TEAM_PLACE_NAME));
    }

    public static TeamPlace JAPANESE_TEAM_PLACE() {
        return new TeamPlace(new Name(JAPANESE_TEAM_PLACE_NAME));
    }

    public static TeamPlace FLUID_TEAM_PLACE() {
        return new TeamPlace(new Name(FLUID_TEAM_PLACE_NAME));
    }

    public static TeamPlace STATICS_TEAM_PLACE() {
        return new TeamPlace(new Name(STATICS_TEAM_PLACE_NAME));
    }

    public static TeamPlace DYNAMICS_TEAM_PLACE() {
        return new TeamPlace(new Name(DYNAMICS_TEAM_PLACE_NAME));
    }

    public static TeamPlace CONTROLS_TEAM_PLACE() {
        return new TeamPlace(new Name(CONTROLS_TEAM_PLACE_NAME));
    }

    public static TeamPlace MATERIALS_TEAM_PLACE() {
        return new TeamPlace(new Name(MATERIALS_TEAM_PLACE_NAME));
    }
}
