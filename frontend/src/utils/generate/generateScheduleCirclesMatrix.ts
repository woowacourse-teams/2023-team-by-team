import type { ScheduleWithTeamPlaceId } from '~/types/schedule';
import { getDateByPosition } from '../get/getDateByPosition';
import type { ScheduleCircle } from '~/types/schedule';
import { arrayOf } from '../arrayOf';
import { CALENDAR, SCHEDULE_CIRCLE_MAX_COUNT } from '~/constants/calendar';

/**
 * 《generateScheduleCirclesMatrix》
 * 이 유틸 함수는 가공 전의 팀플레이스 아이디가 포함된 스케줄 데이터를 받고, 이를 즉시 랜더링이 가능한 서클 형태로 내보내는 역할을 수행합니다.
 * - 일정의 기간에 상관없이 현재 달력에 표시되어야 하는 부분만 결과로 반환됩니다.
 * - 각 일자에 서클을 표시할 때, 팀플레이스 하나 당 하나의 서클만 반환됩니다.
 * - 잘리는 일정이나 잘못된 일정이 있는 경우도 처리가 가능합니다.
 *
 * @param year - 스케줄 바를 표시할 연도
 * @param month - 스케줄 바를 표시할 월
 * @param schedules - 팀플레이스의 아이디가 포함된 스케줄들
 * @returns leveledScheduleBars - ScheduleBarProps 타입의 형태로 결과물을 반환합니다
 */
export const generateScheduleCirclesMatrix = (
  year: number,
  month: number,
  schedules: ScheduleWithTeamPlaceId[],
) => {
  const scheduleCirclesMatrix: ScheduleCircle[][] = arrayOf(
    CALENDAR.ROW_SIZE,
  ).map(() =>
    arrayOf(CALENDAR.COLUMN_SIZE).map(() => {
      const emptyScheduleIds: ScheduleCircle = { teamPlaceIds: [] };
      return emptyScheduleIds;
    }),
  );

  arrayOf(CALENDAR.ROW_SIZE).forEach((row) => {
    arrayOf(CALENDAR.COLUMN_SIZE).forEach((column) => {
      const currentDate = getDateByPosition(year, month, row, column);

      schedules.forEach((schedule) => {
        if (isDateInPeriod(currentDate, schedule)) {
          scheduleCirclesMatrix[row][column].teamPlaceIds.push(
            schedule.teamPlaceId,
          );
        }
      });
    });
  });

  const duplicateRemovedCirclesMatrix = removeDuplicatesInMatrix(
    scheduleCirclesMatrix,
  );
  const sortedScheduleCirclesMatrix = getSortedScheduleCirclesMatrix(
    duplicateRemovedCirclesMatrix,
  );
  const slicedScheduleCirclesMatrix = getSlicedScheduleCirclesMatrix(
    sortedScheduleCirclesMatrix,
  );

  return slicedScheduleCirclesMatrix;
};

const removeDuplicatesInMatrix = (
  scheduleCirclesMatrix: ScheduleCircle[][],
) => {
  const duplicateRemovedCirclesMatrix = scheduleCirclesMatrix.map(
    (scheduleCircles) =>
      scheduleCircles.map(({ teamPlaceIds }) => ({
        teamPlaceIds: [...new Set(teamPlaceIds)],
      })),
  );

  return duplicateRemovedCirclesMatrix;
};

const getSortedScheduleCirclesMatrix = (
  scheduleCirclesMatrix: ScheduleCircle[][],
) => {
  const sortedScheduleCirclesMatrix = scheduleCirclesMatrix.map(
    (scheduleCircles) =>
      scheduleCircles.map(({ teamPlaceIds }) => ({
        teamPlaceIds: [...teamPlaceIds.sort((a, b) => a - b)],
      })),
  );

  return sortedScheduleCirclesMatrix;
};

const getSlicedScheduleCirclesMatrix = (
  scheduleCirclesMatrix: ScheduleCircle[][],
) => {
  const slicedScheduleCirclesMatrix = scheduleCirclesMatrix.map(
    (scheduleCircles) =>
      scheduleCircles.map(({ teamPlaceIds }) => ({
        teamPlaceIds: teamPlaceIds.slice(0, SCHEDULE_CIRCLE_MAX_COUNT),
      })),
  );

  return slicedScheduleCirclesMatrix;
};

const isDateInPeriod = (date: Date, schedule: ScheduleWithTeamPlaceId) => {
  const { startDateTime, endDateTime } = schedule;
  const startDateBoundary = new Date(`${startDateTime.split(' ')[0]} 00:00`);
  const endDateBoundary = new Date(`${endDateTime.split(' ')[0]} 23:59`);

  return date >= startDateBoundary && date <= endDateBoundary;
};
