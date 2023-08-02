import type { ScheduleBarProps } from '~/components/ScheduleBar/ScheduleBar';
import { CALENDAR, ONE_DAY } from '~/constants/calendar';
import type { Position, Schedule } from '~/types/schedule';
import { parseDate } from '~/utils/parseDate';
import { generateUuid } from '~/utils/generateUuid';

type CalendarObject = Record<string, Position>;

/**
 * 《generateScheduleBars》
 * 이 유틸 함수는 가공 전의 스케줄 데이터를 받고, 이를 즉시 랜더링이 가능한 바 형태로 내보내는 역할을 수행합니다.
 * - 스케줄 바를 한 줄에 랜더링할 수 있도록 여러 줄에 걸친 스케줄을 여러 개의 작은 스케줄로 쪼갭니다.
 * - 스케줄이 중첩될 경우 겹치지 않는 적절한 위치에 랜더링할 수 있도록 level 값을 포함하여 제공합니다.
 * - 잘리는 일정이나 잘못된 일정이 있는 경우도 처리가 가능합니다.
 *
 * @param year - 스케줄 바를 표시할 연도
 * @param month - 스케줄 바를 표시할 월
 * @param schedules - 가공되기 전의 스케줄 데이터가 저장된 배열
 * @returns leveledScheduleBars - ScheduleBarProps 타입의 형태로 결과물을 반환합니다
 */
export const generateScheduleBars = (
  year: number,
  month: number,
  schedules: Schedule[],
) => {
  const calendarObject = generateCalendarObject(year, month);
  const rawScheduleBars = generateRawScheduleBars(
    year,
    month,
    schedules,
    calendarObject,
  );
  const leveledScheduleBars = giveLevelToScheduleBars(rawScheduleBars);
  const slicedScheduleBars = sliceScheduleBars(leveledScheduleBars);

  return slicedScheduleBars;
};

const getFirstLastDateOfCalendar = (year: number, month: number) => {
  const firstDateOfMonth = new Date(year, month);
  const firstDateOfCalendar = new Date(
    firstDateOfMonth.getTime() - ONE_DAY * firstDateOfMonth.getDay(),
  );
  const lastDateOfCalendar = new Date(
    firstDateOfCalendar.getTime() +
      CALENDAR.ROW_SIZE * CALENDAR.COLUMN_SIZE * ONE_DAY -
      1,
  );

  return { firstDateOfCalendar, lastDateOfCalendar };
};

const generateCalendarObject = (year: number, month: number) => {
  const { firstDateOfCalendar } = getFirstLastDateOfCalendar(year, month);
  const calendarObject: CalendarObject = {};

  Array.from(
    { length: CALENDAR.ROW_SIZE * CALENDAR.COLUMN_SIZE },
    (_, index) => {
      const currentDate = new Date(
        firstDateOfCalendar.getTime() + index * ONE_DAY,
      );
      const formattedDate = formatDate(currentDate);
      const position = {
        row: Math.floor(index / CALENDAR.COLUMN_SIZE),
        column: index % CALENDAR.COLUMN_SIZE,
      };

      calendarObject[formattedDate] = position;
    },
  );

  return calendarObject;
};

const formatDate = (rawDate: Date) => {
  const { year, month, date } = parseDate(rawDate);
  const formattedDate = `${year}/${month + 1}/${date}`;

  return formattedDate;
};

const generateRawScheduleBars = (
  year: number,
  month: number,
  schedules: Schedule[],
  calendarObject: CalendarObject,
) => {
  const rawScheduleBars: ScheduleBarProps[] = [];

  schedules.forEach((schedule) => {
    const { startDateTime, endDateTime, id: scheduleId, title } = schedule;
    const { firstDateOfCalendar, lastDateOfCalendar } =
      getFirstLastDateOfCalendar(year, month);
    const startDate = new Date(
      Math.max(
        new Date(startDateTime).getTime(),
        firstDateOfCalendar.getTime(),
      ),
    );
    const endDate = new Date(
      Math.min(new Date(endDateTime).getTime(), lastDateOfCalendar.getTime()),
    );

    if (startDate <= endDate) {
      const duration = calcDuration(startDate, endDate);
      const id = generateUuid();
      const { row, column } = calendarObject[formatDate(startDate)];

      rawScheduleBars.push({
        id,
        scheduleId,
        schedule,
        title,
        row,
        column,
        duration,
        level: 0,
      });
    }
  });

  return rawScheduleBars;
};

const calcDuration = (start: Date, end: Date) => {
  const startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const diff = new Date(startDate).getTime() - new Date(endDate).getTime();

  return Math.abs(diff / ONE_DAY) + 1;
};

const sortScheduleBars = (scheduleBars: ScheduleBarProps[]) => {
  return [...scheduleBars].sort((a, b) => {
    if (a.row !== b.row) {
      return a.row - b.row;
    }

    if (a.column !== b.column) {
      return a.column - b.column;
    }

    return b.duration - a.duration;
  });
};

const sliceScheduleBars = (rawScheduleBars: ScheduleBarProps[]) => {
  const slicedScheduleBars: ScheduleBarProps[] = [];

  rawScheduleBars.forEach((scheduleBar) => {
    const { row, column, duration } = scheduleBar;
    let remainingDuration = duration;
    let currentRow = row;
    let currentColumn = column;

    while (remainingDuration > 0 && currentRow < CALENDAR.ROW_SIZE) {
      const currentDuration = Math.min(
        remainingDuration,
        CALENDAR.COLUMN_SIZE - currentColumn,
      );

      slicedScheduleBars.push({
        ...scheduleBar,
        row: currentRow,
        column: currentColumn,
        duration: currentDuration,
      });

      currentRow += 1;
      currentColumn = 0;
      remainingDuration -= currentDuration;
    }
  });

  return slicedScheduleBars;
};

const giveLevelToScheduleBars = (scheduleBars: ScheduleBarProps[]) => {
  const leveledScheduleBars: ScheduleBarProps[] = [];
  const lastIndexes: number[] = [];
  const sortedScheduleBars = sortScheduleBars(scheduleBars);

  sortedScheduleBars.forEach((scheduleBar) => {
    const { row, column, duration } = scheduleBar;
    const level = lastIndexes.findIndex(
      (lastIndex: number) => lastIndex < row * CALENDAR.COLUMN_SIZE + column,
    );

    if (level === -1) {
      lastIndexes.push(row * CALENDAR.COLUMN_SIZE + column + duration - 1);
      leveledScheduleBars.push({
        ...scheduleBar,
        level: lastIndexes.length - 1,
      });
    } else {
      lastIndexes[level] = row * CALENDAR.COLUMN_SIZE + column + duration - 1;
      leveledScheduleBars.push({
        ...scheduleBar,
        level,
      });
    }
  });

  return leveledScheduleBars;
};
