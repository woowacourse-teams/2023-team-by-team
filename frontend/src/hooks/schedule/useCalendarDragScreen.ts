import { useState, useEffect, useMemo } from 'react';
import { generateScheduleBarsByMousePoint } from '~/utils/generateScheduleBarsByMousePoint';
import type { RefObject } from 'react';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';

interface UseCalendarDragScreenProps {
  visible: boolean;
  calendarRef: RefObject<HTMLDivElement>;
  calendarSize: CalendarSize;
  onMouseUp: (
    title: string,
    startDateTime: Schedule['startDateTime'],
    endDateTime: Schedule['endDateTime'],
    shouldUpdate: boolean,
  ) => void;
  initX: number;
  initY: number;
  year: number;
  month: number;
  level: number;
  schedule: Schedule;
}

interface CalendarPointInfos {
  relativeX: number;
  relativeY: number;
  calendarWidth: number;
  calendarHeight: number;
}

export const useCalendarDragScreen = (props: UseCalendarDragScreenProps) => {
  const {
    visible,
    calendarRef,
    calendarSize,
    initX,
    initY,
    onMouseUp,
    year,
    month,
    level,
    schedule,
  } = props;
  const [calendarPointInfos, setCalendarPointInfos] =
    useState<CalendarPointInfos>({
      relativeX: 0,
      relativeY: 0,
      calendarWidth: 0,
      calendarHeight: 0,
    });
  const { relativeX, relativeY, calendarWidth, calendarHeight } =
    calendarPointInfos;

  const scheduleBarsInfo = useMemo(
    () =>
      visible
        ? generateScheduleBarsByMousePoint({
            schedule,
            year,
            month,
            relativeX,
            relativeY,
            calendarWidth,
            calendarHeight,
            level,
            calendarSize,
          })
        : null,
    [
      calendarHeight,
      calendarSize,
      calendarWidth,
      level,
      month,
      relativeX,
      relativeY,
      schedule,
      visible,
      year,
    ],
  );

  const getProcessedRelativePoint = () => {
    const processedRelativeX =
      ((relativeX + calendarWidth * (15 / 14)) % (calendarWidth / 7)) -
      calendarWidth / 14;
    const processedRelativeY =
      ((relativeY + calendarHeight * (13 / 12)) % (calendarHeight / 6)) -
      calendarHeight / 12;

    return { x: processedRelativeX, y: processedRelativeY };
  };

  useEffect(() => {
    const calendarElement = calendarRef.current;

    if (!calendarElement) {
      return;
    }

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!visible) {
        return;
      }

      const { clientX, clientY } = e;
      setCalendarPointInfos((prev) => ({
        ...prev,
        relativeX: clientX - initX,
        relativeY: clientY - initY,
      }));
    };

    const handleMouseUp = () => {
      if (!visible || !scheduleBarsInfo) {
        return;
      }

      const { title } = schedule;
      const { startDateTime, endDateTime } = scheduleBarsInfo;
      const shouldUpdate = schedule.startDateTime !== startDateTime;

      onMouseUp(title, startDateTime, endDateTime, shouldUpdate);
    };

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = calendarElement;

      setCalendarPointInfos((prev) => ({
        ...prev,
        calendarWidth: clientWidth,
        calendarHeight: clientHeight,
      }));
    });

    calendarElement.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    resizeObserver.observe(calendarElement);

    return () => {
      calendarElement.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
    };
  }, [
    visible,
    onMouseUp,
    calendarRef,
    relativeX,
    relativeY,
    initX,
    initY,
    scheduleBarsInfo,
    schedule,
  ]);

  const processedRelativePoint = getProcessedRelativePoint();

  return {
    scheduleBars: scheduleBarsInfo ? scheduleBarsInfo.scheduleBars : [],
    relativeX: processedRelativePoint.x,
    relativeY: processedRelativePoint.y,
  };
};
