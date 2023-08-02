import Text from '~/components/common/Text/Text';
import { useFetchMyDailySchedules } from '~/hooks/queries/useFetchMyDailySchedule';
import { parseDate } from '~/utils/parseDate';
import * as S from './MyDailyScheduleList.styled';
import MyDailySchedule from '~/components/MyDailyScheduleList/MyDailySchedule/MyDailySchedule';
import type { TeamPlaceColor } from '~/types/team';

interface MyDailyScheduleListProps {
  rawDate: Date;
}

const MyDailyScheduleList = (props: MyDailyScheduleListProps) => {
  const { rawDate } = props;
  const { year, month, date } = parseDate(rawDate);

  const schedules = useFetchMyDailySchedules(year, month, date);

  return (
    <S.ScheduleWrapper>
      {schedules.length !== 0 &&
        schedules.map((schedule, index) => {
          const { id, teamPlaceId, ...rest } = schedule;

          const teamPlaceColor = (index % 10) as TeamPlaceColor; //팀플레이스 색상 구하는 임시로직 후에 삭제예정

          return (
            <MyDailySchedule
              key={id}
              teamPlaceColor={teamPlaceColor}
              teamName={'임시아무이름입니다.'}
              currentDateTime={`${year}-${month}-${date} 00:00`}
              {...rest}
            />
          );
        })}
    </S.ScheduleWrapper>
  );
};

export default MyDailyScheduleList;
