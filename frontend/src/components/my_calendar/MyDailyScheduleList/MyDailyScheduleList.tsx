import { useFetchMyDailySchedules } from '~/hooks/queries/useFetchMyDailySchedule';
import { parseDate } from '~/utils/parseDate';
import * as S from './MyDailyScheduleList.styled';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import MyDailySchedule from '~/components/my_calendar/MyDailySchedule/MyDailySchedule';
import { generateYYYYMMDDWithoutHyphens } from '~/utils/generateYYYYMMDDWithoutHyphens';

interface MyDailyScheduleListProps {
  rawDate: Date;
}

const MyDailyScheduleList = (props: MyDailyScheduleListProps) => {
  const { rawDate } = props;
  const { year, month, date } = parseDate(rawDate);
  const scheduleDate = generateYYYYMMDDWithoutHyphens(rawDate);
  const schedules = useFetchMyDailySchedules(scheduleDate);
  const { teamPlaces } = useTeamPlace();

  return (
    <S.ScheduleWrapper>
      {schedules.length !== 0 &&
        schedules.map((schedule) => {
          const { id, teamPlaceId, ...rest } = schedule;

          const { teamPlaceColor, displayName } = getInfoByTeamPlaceId(
            teamPlaces,
            teamPlaceId,
          );

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
