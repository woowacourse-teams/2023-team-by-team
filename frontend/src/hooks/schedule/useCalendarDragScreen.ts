import { useState, useEffect, useCallback } from 'react';
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

  const scheduleBarsInfo = visible
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
    : null;

  const getProcessedRelativePoint = () => {
    const processedRelativeX =
      ((relativeX + calendarWidth * (15 / 14)) % (calendarWidth / 7)) -
      calendarWidth / 14;
    const processedRelativeY =
      ((relativeY + calendarHeight * (13 / 12)) % (calendarHeight / 6)) -
      calendarHeight / 12;

    return { x: processedRelativeX, y: processedRelativeY };
  };

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!visible) {
        return;
      }

      const { clientX, clientY } = e;

      setCalendarPointInfos((prev) => ({
        ...prev,
        relativeX: clientX - initX,
        relativeY: clientY - initY,
      }));
    },
    [initX, initY, visible],
  );

  const handleMouseUp = useCallback(() => {
    if (!visible || !scheduleBarsInfo) {
      return;
    }

    const { title } = schedule;
    const { startDateTime, endDateTime } = scheduleBarsInfo;
    const shouldUpdate = schedule.startDateTime !== startDateTime;

    onMouseUp(title, startDateTime, endDateTime, shouldUpdate);

    setCalendarPointInfos((prev) => ({
      ...prev,
      relativeX: 0,
      relativeY: 0,
    }));
  }, [onMouseUp, schedule, scheduleBarsInfo, visible]);

  useEffect(() => {
    const calendarElement = calendarRef.current;

    if (!calendarElement) {
      return;
    }

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
  }, [calendarRef, handleMouseMove, handleMouseUp]);

  const processedRelativePoint = getProcessedRelativePoint();

  return {
    scheduleBars: scheduleBarsInfo ? scheduleBarsInfo.scheduleBars : [],
    relativeX: processedRelativePoint.x,
    relativeY: processedRelativePoint.y,
  };
};
