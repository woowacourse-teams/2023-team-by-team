import { Fragment } from 'react';
import { css } from 'styled-components';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import useCalendar from '~/hooks/useCalendar';
import * as S from './IntegratedCalendar.styled';
import DateCell from '~/components/Calendar/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import { DAYS_OF_WEEK } from '~/constants/calendar';

const IntegratedCalendar = () => {
  const {
    year,
    month,
    calendar,

    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();

  return (
    <S.Container>
      <S.CalendarHeader>
        <Text
          css={css`
            font-size: 16px;
            font-weight: 600;
          `}
        >
          {year}년 {month + 1}월
        </Text>
        <div>
          <Button
            variant="plain"
            size="sm"
            onClick={handlePrevButtonClick}
            aria-label="이전 달로 이동하기"
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="plain"
            size="sm"
            onClick={handleNextButtonClick}
            aria-label="다음 달로 이동하기"
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </S.CalendarHeader>
      <div>
        <S.DaysOfWeek>
          {DAYS_OF_WEEK.map((day) => {
            return <S.DayOfWeek key={day}>{day}</S.DayOfWeek>;
          })}
        </S.DaysOfWeek>
        <div>
          {calendar.map((week, index) => {
            return (
              <Fragment key={index}>
                <S.ScheduleBarContainer></S.ScheduleBarContainer>
                <S.DateView>
                  {week.map((day) => {
                    return (
                      <DateCell
                        key={day.toISOString()}
                        rawDate={day}
                        currentMonth={month}
                        size="sm"
                      />
                    );
                  })}
                </S.DateView>
              </Fragment>
            );
          })}
        </div>
      </div>
    </S.Container>
  );
};

export default IntegratedCalendar;
