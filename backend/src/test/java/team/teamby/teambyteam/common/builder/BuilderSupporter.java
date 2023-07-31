package team.teamby.teambyteam.common.builder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.notice.domain.NoticeRepository;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;

@Component
public class BuilderSupporter {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Autowired
    private TeamPlaceRepository teamPlaceRepository;

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    public ScheduleRepository scheduleRepository() {
        return scheduleRepository;
    }

    public MemberRepository memberRepository() {
        return memberRepository;
    }

    public MemberTeamPlaceRepository memberTeamPlaceRepository() {
        return memberTeamPlaceRepository;
    }

    public TeamPlaceRepository teamPlaceRepository() {
        return teamPlaceRepository;
    }

    public FeedRepository feedRepository() {
        return feedRepository;
    }

    public NoticeRepository noticeRepository() {
        return noticeRepository;
    }
}
