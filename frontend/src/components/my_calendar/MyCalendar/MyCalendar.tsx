import { Fragment } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import DateCell from '~/components/common/DateCell/DateCell';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import useCalendar from '~/hooks/useCalendar';
import { useFetchMySchedules } from '~/hooks/queries/useFetchMySchedules';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { DAYS_OF_WEEK } from '~/constants/calendar';
import { parseDate } from '~/utils/parseDate';
import { generateScheduleCirclesMatrix } from '~/utils/generateScheduleCirclesMatrix';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import { fetchMySchedules } from '~/apis/schedule';
import * as S from './MyCalendar.styled';

interface MyCalendarProps {
  onDailyClick: (date: Date) => void;
}

const MyCalendar = (props: MyCalendarProps) => {
  const { onDailyClick } = props;
  const {
    year,
    month,
    calendar,
    today,
    handlers: { handlePrevButtonClick, handleNextButtonClick },
  } = useCalendar();

  const schedules = useFetchMySchedules(year, month);
  const scheduleCircles = generateScheduleCirclesMatrix(year, month, schedules);
  const { teamPlaces } = useTeamPlace();
  const queryClient = useQueryClient();

  const prefetchMySchedules = (year: number, month: number) => {
    const adjustedYear =
      month === -1 ? year - 1 : month === 12 ? year + 1 : year;
    const adjustedMonth = month === -1 ? 11 : month === 12 ? 0 : month;

    queryClient.prefetchQuery(['mySchedules', year, month], () =>
      fetchMySchedules(adjustedYear, adjustedMonth + 1),
    );
  };

  return (
    <S.Container>
      <S.CalendarHeader>
        <Button
          variant="plain"
          size="sm"
          onMouseEnter={() => prefetchMySchedules(year, month - 1)}
          onClick={handlePrevButtonClick}
          css={S.monthButton}
          aria-label="이전 달로 이동하기"
        >
          <ArrowLeftIcon />
        </Button>
        <time>
          <Text size="lg" weight="semiBold">
            {year}년 {month + 1}월
          </Text>
        </time>
        <Button
          variant="plain"
          size="sm"
          onMouseEnter={() => prefetchMySchedules(year, month + 1)}
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
                      today.year === renderYear &&
                      today.month === renderMonth &&
                      today.date === renderDate;

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
