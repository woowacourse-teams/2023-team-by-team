package team.teamby.teambyteam.common.builder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

@Component
public class TestFixtureBuilder {

    @Autowired
    private BuilderSupporter bs;

    public Schedule buildSchedule(final Schedule schedule) {
        return bs.scheduleRepository().save(schedule);
    }

    public Member buildMember(final Member member) {
        return bs.memberRepository().save(member);
    }

    public MemberTeamPlace buildMemberTeamPlace(final MemberTeamPlace memberTeamPlace) {
        return bs.memberTeamPlaceRepository().save(memberTeamPlace);
    }

    public TeamPlace buildTeamPlace(final TeamPlace teamPlace) {
        return bs.teamPlaceRepository().save(teamPlace);
    }

    public List<Schedule> buildSchedules(final List<Schedule> schedules) {
        return bs.scheduleRepository().saveAll(schedules);
    }

    public List<Member> buildMembers(final List<Member> members) {
        return bs.memberRepository().saveAll(members);
    }

    public List<MemberTeamPlace> buildMemberTeamPlaces(final List<MemberTeamPlace> memberTeamPlaces) {
        return bs.memberTeamPlaceRepository().saveAll(memberTeamPlaces);
    }

    public List<TeamPlace> buildTeamPlaces(final List<TeamPlace> teamPlaces) {
        return bs.teamPlaceRepository().saveAll(teamPlaces);
    }
}
