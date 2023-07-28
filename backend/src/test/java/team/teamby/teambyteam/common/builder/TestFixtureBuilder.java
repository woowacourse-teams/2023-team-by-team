package team.teamby.teambyteam.common.builder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;
import java.util.Objects;

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

    public MemberTeamPlace buildMemberAndTeamPlace(final Member member, final TeamPlace teamPlace) {
        final Member savedMember = getSavedMember(member);
        final TeamPlace savedTeamPlace = getSavedTeamPlace(teamPlace);
        final MemberTeamPlace memberTeamPlace = new MemberTeamPlace();
        memberTeamPlace.setMemberAndTeamPlace(savedMember, savedTeamPlace);
        return buildMemberTeamPlace(memberTeamPlace);
    }

    private Member getSavedMember(final Member member) {
        if (bs.memberRepository().existsByEmail(member.getEmail())) {
            return member;
        }
        return buildMember(member);
    }

    private TeamPlace getSavedTeamPlace(final TeamPlace teamPlace) {
        if (Objects.nonNull(teamPlace.getId()) && bs.teamPlaceRepository().existsById(teamPlace.getId())) {
            return teamPlace;
        }
        return buildTeamPlace(teamPlace);
    }

    public Feed buildFeed(final Feed feed) {
        return bs.feedRepository().save(feed);
    }

    public List<Feed> buildFeeds(final List<Feed> feeds) {
        return bs.feedRepository().saveAll(feeds);
    }
}
