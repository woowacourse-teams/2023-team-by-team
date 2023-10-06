import Text from '~/components/common/Text/Text';
import * as S from './SideBar.styled';
import MyCalendar from '~/components/my_calendar/MyCalendar/MyCalendar';
import MyDailyScheduleList from '~/components/my_calendar/MyDailyScheduleList/MyDailyScheduleList';
import { useState } from 'react';
import { parseDate } from '~/utils/parseDate';

const SideBar = () => {
  const [dailyScheduleDate, setDailyScheduleDate] = useState(new Date());
  const { month, date } = parseDate(dailyScheduleDate);

  const handleChangeDailySchedule = (date: Date) => {
    setDailyScheduleDate(() => date);
  };

  return (
    <S.Aside>
      <S.InnerContainer>
        <div>
          <Text size="xl" css={S.highLight}>
            내 일정
          </Text>
        </div>
        <MyCalendar onDailyClick={handleChangeDailySchedule} />
      </S.InnerContainer>
      <S.InnerContainer>
        <div>
          <Text size="xl" css={S.highLight}>
            {String(month + 1).padStart(2, '0')}월{' '}
            {String(date).padStart(2, '0')}일 일정
          </Text>
        </div>
        <MyDailyScheduleList rawDate={dailyScheduleDate} />
      </S.InnerContainer>
    </S.Aside>
  );
};

export default SideBar;
