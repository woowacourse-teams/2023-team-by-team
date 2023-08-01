import type { YYYYMMDDHHMM } from '~/types/schedule';

export const formatTime = (
  currentDateTime: YYYYMMDDHHMM,
  startDateTime: YYYYMMDDHHMM,
  endDateTime: YYYYMMDDHHMM,
) => {
  const [currentDate, _] = currentDateTime.split(' ');
  const [startDate, startTime] = startDateTime.split(' ');
  const [endDate, endTime] = endDateTime.split(' ');

  if (startDate === endDate)
    if (startTime === '00:00' && endTime === '23:59') return '종일';
    else return `${startTime} ~ ${endTime}`;

  if (startDate === currentDate) return `${startTime} ~ 00:00`;
  if (endDate === currentDate) return `00:00 ~ ${endTime}`;

  return '종일';
};
