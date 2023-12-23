import { ONE_DAY } from '~/constants/calendar';
import type { YYYYMMDD } from '~/types/schedule';
import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';

interface DateTimeRange {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  dateDifference: number;
  isAllDay: boolean;
}

const getDateDifference = (beforeDate: YYYYMMDD, afterDate: YYYYMMDD) => {
  const dateTimeDifference =
    (new Date(afterDate).getTime() - new Date(beforeDate).getTime()) / ONE_DAY;

  return dateTimeDifference;
};

const getDateAfterDays = (date: YYYYMMDD, days: number) => {
  const afterDate = generateYYYYMMDD(
    new Date(new Date(date).getTime() + ONE_DAY * days),
  );

  return afterDate;
};

const isDateTimeRangeValid = (dateTimeRange: DateTimeRange) => {
  const { startDate, endDate, startTime, endTime } = dateTimeRange;
  const startDateTime = `${startDate} ${startTime}`;
  const endDateTime = `${endDate} ${endTime}`;

  return (
    isYYYYMMDDHHMM(startDateTime) &&
    isYYYYMMDDHHMM(endDateTime) &&
    startDateTime <= endDateTime
  );
};

export const useDateTimeRange = () => {
  return null;
};
