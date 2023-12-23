import { formatDateTime } from '~/utils/formatDateTime';
import type { YYYYMMDDHHMM } from '~/types/schedule';

export const generateDateTimeRangeDescription = (
  startDateTime: YYYYMMDDHHMM,
  endDateTime: YYYYMMDDHHMM,
) => {
  const [startDate] = startDateTime.split(' ');
  const [endDate, endTime] = endDateTime.split(' ');
  const formattedStartDateTime = formatDateTime(startDateTime);
  const formattedEndDateTime = formatDateTime(endDateTime);
  const formattedStartDate = formattedStartDateTime
    .split(' ')
    .slice(0, 3)
    .join(' ');
  const formattedEndDate = formattedEndDateTime
    .split(' ')
    .slice(0, 3)
    .join(' ');

  if (startDateTime === endDateTime) {
    return formattedStartDateTime;
  }

  if (endTime === '23:59') {
    if (startDate === endDate) {
      return formattedStartDate;
    }

    return `${formattedStartDate} ~ ${formattedEndDate}`;
  }

  return `${formattedStartDateTime} ~ ${formattedEndDateTime}`;
};
