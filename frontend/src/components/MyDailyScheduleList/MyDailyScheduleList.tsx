import { useFetchMyDailySchedules } from '~/hooks/queries/useFetchMyDailySchedule';
import { parseDate } from '~/utils/parseDate';
import * as S from './MyDailyScheduleList.styled';
import MyDailySchedule from '~/components/MyDailyScheduleList/MyDailySchedule/MyDailySchedule';
import type { TeamPlace } from '~/types/team';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';

interface MyDailyScheduleListProps {
  teamPlaces: TeamPlace[];
  rawDate: Date;
}

const MyDailyScheduleList = (props: MyDailyScheduleListProps) => {
  const { teamPlaces, rawDate } = props;
  const { year, month, date } = parseDate(rawDate);
  const schedules = useFetchMyDailySchedules(year, month, date);

  return (
    <S.ScheduleWrapper>
      {schedules.length !== 0 &&
        schedules.map((schedule) => {
          const { id, teamPlaceId, ...rest } = schedule;

          const teamInfo = getInfoByTeamPlaceId(teamPlaces, teamPlaceId);

          if (teamInfo === undefined) return;

          const { teamPlaceColor, displayName } = teamInfo;
          return (
            <MyDailySchedule
              key={id}
              teamPlaceColor={teamPlaceColor}
              teamName={displayName}
              currentDateTime={`${year}-${month}-${date} 00:00`}
              {...rest}
            />
          );
        })}
    </S.ScheduleWrapper>
  );
};

export default MyDailyScheduleList;
