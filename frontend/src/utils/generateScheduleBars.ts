import type { ScheduleBarProps } from '~/components/ScheduleBar/ScheduleBar';
import { CALENDAR, ONE_DAY } from '~/constants/calendar';
import type { Schedule } from '~/types/schedule';
import { parseDate } from '~/utils/parseDate';

interface Position {
  row: number;
  column: number;
}

type CalendarObject = Record<string, Position>;

/**
 * 《convertSchedulesToBars》
 * 이 유틸 함수는 가공 전의 스케줄 데이터를 받고, 이를 즉시 랜더링이 가능한 바 형태로 내보내는 역할을 수행합니다.
 * - 스케줄 바를 한 줄에 랜더링할 수 있도록 여러 줄에 걸친 스케줄을 여러 개의 작은 스케줄로 쪼갭니다.
 * - 스케줄이 중첩될 경우 겹치지 않는 적절한 위치에 랜더링할 수 있도록 level 값을 포함하여 제공합니다.
 *
 *
 * @param year - 스케줄 바를 표시할 연도
 * @param month - 스케줄 바를 표시할 월 (주의: 일상생활에서의 월 그대로를 사용해 주세요 - 7월일 경우: 7)
 * @param schedules - 가공되기 전의 스케줄 데이터가 저장된 배열
 */
export const generateScheduleBars = (
  year: number,
  month: number,
  schedules: Schedule[],
) => {
  const calendarObject = generateCalendarObject(year, month);
  const rawScheduleBars = generateRawScheduleBars(schedules, calendarObject);
  const slicedScheduleBars = sliceScheduleBars(rawScheduleBars);
  const leveledScheduleBars = giveLevelToScheduleBars(slicedScheduleBars);

  return leveledScheduleBars;
};

const generateCalendarObject = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month);
  const firstDayOfCalendar = new Date(
    firstDayOfMonth.getTime() - ONE_DAY * firstDayOfMonth.getDay(),
  );

  const calendarObject: CalendarObject = {};

  Array.from(
    { length: CALENDAR.ROW_SIZE * CALENDAR.COLUMN_SIZE },
    (_, index) => {
      const currentDate = new Date(
        firstDayOfCalendar.getTime() + index * ONE_DAY,
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
  const { month, date } = parseDate(rawDate);
  const formattedDate = `${month + 1}/${date}`;

  return formattedDate;
};

const generateRawScheduleBars = (
  schedules: Schedule[],
  calendarObject: CalendarObject,
) => {
  const rawScheduleBars: ScheduleBarProps[] = schedules.map((schedule) => {
    const { startDateTime, endDateTime, id: scheduleId, title } = schedule;
    const startDate = new Date(startDateTime);
    const duration = calcDuration(startDateTime, endDateTime);
    const { row, column } = calendarObject[formatDate(startDate)];
    const id = crypto.randomUUID();
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return {
      id,
      scheduleId,
      title,
      row,
      column,
      duration,
      level: 0,
      color: `#${randomColor}`,
    };
  });

  return rawScheduleBars;
};

const calcDuration = (
  start: Schedule['startDateTime'],
  end: Schedule['endDateTime'],
) => {
  const [startDate] = start.split(' ');
  const [endDate] = end.split(' ');
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

    while (remainingDuration > 0 && currentRow <= CALENDAR.ROW_SIZE) {
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
  const lastIndexes: number[][] = Array.from({ length: CALENDAR.ROW_SIZE }).map(
    () => [],
  );
  const sortedScheduleBars = sortScheduleBars(scheduleBars);

  sortedScheduleBars.forEach((scheduleBar) => {
    const { row, column, duration } = scheduleBar;
    const level = lastIndexes[row].findIndex(
      (lastIndex: number) => lastIndex < column,
    );

    if (level === -1) {
      lastIndexes[row].push(column + duration - 1);
      leveledScheduleBars.push({
        ...scheduleBar,
        level: lastIndexes[row].length - 1,
      });
    } else {
      lastIndexes[row][level] = column + duration - 1;
      leveledScheduleBars.push({
        ...scheduleBar,
        level,
      });
    }
  });

  return leveledScheduleBars;
};
