import { useState, useEffect } from 'react';
import { generateScheduleBarsByMousePoint } from './generateScheduleBarsByMousePoint';
import type { RefObject } from 'react';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';

interface UseCalendarDragScreenProps {
  visible: boolean;
  calendarRef: RefObject<HTMLDivElement>;
  calendarSize: CalendarSize;
  onMouseUp: () => void;
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

  const scheduleBars = visible
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
    : [];

  useEffect(() => {
    const calendarElement = calendarRef.current;

    if (!calendarElement) {
      return;
    }

    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!visible) {
        return;
      }

      const { clientX, clientY } = e;

      console.log({ x: clientX - initX, y: clientY - initY });

      setCalendarPointInfos((prev) => ({
        ...prev,
        relativeX: clientX - initX,
        relativeY: clientY - initY,
      }));
    };

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = calendarElement;

      setCalendarPointInfos((prev) => ({
        ...prev,
        calendarWidth: clientWidth,
        calendarHeight: clientHeight,
      }));
    });

    calendarElement.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    resizeObserver.observe(calendarElement);

    return () => {
      calendarElement.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
    };
  }, [visible, onMouseUp, calendarRef, relativeX, relativeY, initX, initY]);

  return {
    scheduleBars,
    relativeX: relativeX % (calendarWidth / 7),
    relativeY: relativeY % (calendarHeight / 6),
  };
};
