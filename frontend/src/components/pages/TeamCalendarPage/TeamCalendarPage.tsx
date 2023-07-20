import Calendar from '~/components/Calendar/Calendar';
import IntegratedCalendar from '~/components/IntegratedCalendar/IntegratedCalendar';
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
