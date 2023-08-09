package team.teamby.teambyteam.common.builder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.notice.domain.Notice;
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

    public void deleteMember(final Member member) {
        bs.memberRepository().delete(member);
    }

    public MemberTeamPlace buildMemberTeamPlace(final MemberTeamPlace memberTeamPlace) {
        return bs.memberTeamPlaceRepository().save(memberTeamPlace);
    }

    public void deleteMemberTeamPlace(final MemberTeamPlace memberTeamPlace) {
        bs.memberTeamPlaceRepository().delete(memberTeamPlace);
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

    public MemberTeamPlace buildMemberTeamPlace(final Member member, final TeamPlace teamPlace) {
        final MemberTeamPlace memberTeamPlace = new MemberTeamPlace();
        memberTeamPlace.setMemberAndTeamPlace(member, teamPlace);
        return bs.memberTeamPlaceRepository().save(memberTeamPlace);
    }

    public List<MemberTeamPlace> buildMemberTeamPlaces(final List<MemberTeamPlace> memberTeamPlaces) {
        return bs.memberTeamPlaceRepository().saveAll(memberTeamPlaces);
    }

    public List<TeamPlace> buildTeamPlaces(final List<TeamPlace> teamPlaces) {
        return bs.teamPlaceRepository().saveAll(teamPlaces);
    }

    public Feed buildFeed(final Feed feed) {
        return bs.feedRepository().save(feed);
    }

    public List<Feed> buildFeeds(final List<Feed> feeds) {
        return bs.feedRepository().saveAll(feeds);
    }

    public Notice buildNotice(final Notice notice) {
        return bs.noticeRepository().save(notice);
    }

    public List<Notice> buildNotices(final List<Notice> notices) {
        return bs.noticeRepository().saveAll(notices);
    }
}
