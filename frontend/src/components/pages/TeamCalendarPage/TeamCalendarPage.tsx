import Calendar from '~/components/Calendar/Calendar';
import MyCalendar from '~/components/MyCalendar/MyCalendar';
import * as S from './TeamCalendarPage.styled';

const TeamCalendarPage = () => {
  return (
    <S.Container>
      <S.CalendarWrapper>
        <Calendar />
      </S.CalendarWrapper>
      {/* <S.IntegratedCalendarWrapper>
        <IntegratedCalendar />
      </S.IntegratedCalendarWrapper> */}
    </S.Container>
  );
};

export default TeamCalendarPage;
