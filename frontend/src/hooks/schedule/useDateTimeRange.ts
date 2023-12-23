import { useState } from 'react';
import { ONE_DAY } from '~/constants/calendar';
import { generateYYYYMMDD } from '~/utils/generateYYYYMMDD';
import { generateYYYYMMDDHHMM } from '~/utils/generateYYYYMMDDHHMM';
import { isYYYYMMDD, isYYYYMMDDHHMM } from '~/types/typeGuard';
import type { Schedule, YYYYMMDD } from '~/types/schedule';

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

const generateDateTimeRange = (dateData: Date | Schedule, title: string) => {
  if (dateData instanceof Date) {
    const [initDate] = generateYYYYMMDDHHMM(dateData).split(' ');

    return {
      title,
      startDate: initDate,
      endDate: initDate,
      startTime: '09:00',
      endTime: '10:00',
      dateDifference: 0,
      isAllDay: false,
    };
  }

  const [startDate, startTime] = dateData.startDateTime.split(' ');
  const [endDate, endTime] = dateData.endDateTime.split(' ');
  const dateDifference =
    isYYYYMMDD(startDate) && isYYYYMMDD(endDate)
      ? getDateDifference(startDate, endDate)
      : 0;

  return {
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    dateDifference,
    isAllDay: endTime === '23:59',
  };
};

export const useDateTimeRange = (
  dateData: Date | Schedule,
  initTitle: string,
) => {
  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRange>(
    generateDateTimeRange(dateData, initTitle),
  );
  const {
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    dateDifference,
    isAllDay,
  } = dateTimeRange;
};
