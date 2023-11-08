import type { Schedule } from '~/types/schedule';
const getCalendarGridDifference = (
  relativeX: number,
  relativeY: number,
  calendarWidth: number,
  calendarHeight: number,
) => {
  const rowDifference =
    relativeY > 0
      ? Math.floor((relativeY * 6) / calendarHeight)
      : Math.ceil((relativeY * 6) / calendarHeight);
  const columnDifference =
    relativeX > 0
      ? Math.floor((relativeX * 7) / calendarWidth)
      : Math.ceil((relativeX * 7) / calendarWidth);

  return { rowDifference, columnDifference };
};

const changeDateTimeByDays = (
  dateTime: Schedule['startDateTime'],
  days: number,
) => {
  const changedDate = new Date(Number(new Date(dateTime)) + 86_400_000 * days);

  const year = String(changedDate.getFullYear()).padStart(4, '0');
  const month = String(changedDate.getMonth() + 1).padStart(2, '0');
  const day = String(changedDate.getDate()).padStart(2, '0');
  const time = dateTime.split(' ')[1];
  const [minute, second] = time.split(':');

  const changedDateTime: Schedule['startDateTime'] = `${year}-${month}-${day} ${minute}:${second}`;

  return changedDateTime;
};
