import { Fragment } from 'react';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import useCalendar from '~/hooks/useCalendar';
import * as S from './MyCalendar.styled';
import DateCell from '~/components/common/DateCell/DateCell';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import { DAYS_OF_WEEK } from '~/constants/calendar';
import { useFetchMySchedules } from '~/hooks/queries/useFetchMySchedules';
import { parseDate } from '~/utils/parseDate';
import { generateScheduleCirclesMatrix } from '~/utils/generateScheduleCirclesMatrix';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';
import { useTeamPlace } from '~/hooks/useTeamPlace';

interface MyCalendarProps {
  onDailyClick: (date: Date) => void;
}

const MyCalendar = (props: MyCalendarProps) => {
  const { onDailyClick } = props;
  const {
    year,
    month,
    calendar,
    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();
  const {
    year: currentYear,
    month: currentMonth,
    date: currentDate,
  } = parseDate(new Date());

  const schedules = useFetchMySchedules(year, month);
  const scheduleCircles = generateScheduleCirclesMatrix(year, month, schedules);
  const { teamPlaces } = useTeamPlace();

  return (
    <S.Container>
      <S.CalendarHeader>
        <Button
          variant="plain"
          size="sm"
          onClick={handlePrevButtonClick}
          css={S.monthButton}
          aria-label="이전 달로 이동하기"
        >
          <ArrowLeftIcon />
        </Button>
        <Text size="xl">
          {year}년 {month + 1}월
        </Text>
        <Button
          variant="plain"
          size="sm"
          onClick={handleNextButtonClick}
          css={S.monthButton}
          aria-label="다음 달로 이동하기"
        >
          <ArrowRightIcon />
        </Button>
      </S.CalendarHeader>
      <div>
        <S.DaysOfWeek>
          {DAYS_OF_WEEK.map((day) => {
            return (
              <Text key={day} size="sm" weight="bold" css={S.dayOfWeek}>
                {day}
              </Text>
            );
          })}
        </S.DaysOfWeek>
        <div>
          {calendar.map((week, rowIndex) => {
            return (
              <Fragment key={rowIndex}>
                <S.DateView>
                  {week.map((day, colIndex) => {
                    const {
                      year: renderYear,
                      month: renderMonth,
                      date: renderDate,
                    } = parseDate(day);

                    const isToday =
                      currentYear === renderYear &&
                      currentMonth === renderMonth &&
                      currentDate === renderDate;

                    return (
                      <div key={day.toISOString()}>
                        <DateCell
                          rawDate={day}
                          currentMonth={month}
                          isToday={isToday}
                          size="sm"
                          onDayClick={() => onDailyClick(day)}
                        />
                        <S.ScheduleCircleWrapper>
                          {scheduleCircles[rowIndex][colIndex].teamPlaceIds.map(
                            (teamPlaceId) => {
                              const { teamPlaceColor } = getInfoByTeamPlaceId(
                                teamPlaces,
                                teamPlaceId,
                              );
                              return (
                                <TeamBadge
                                  key={`${day.toISOString()}+${teamPlaceId}`}
                                  size="sm"
                                  teamPlaceColor={teamPlaceColor}
                                />
                              );
                            },
                          )}
                        </S.ScheduleCircleWrapper>
                      </div>
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

export default MyCalendar;