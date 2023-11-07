import { useState, useEffect } from 'react';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import type { RefObject } from 'react';
import type { Schedule } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';

interface UseCalendarDragScreenProps {
  visible: boolean;
  calendarRef: RefObject<HTMLDivElement>;
  calendarSize: CalendarSize;
  onMouseUp: () => void;
  year: number;
  month: number;
  level: number;
  schedule: Schedule;
}

interface CalendarPointInfos {
  initX: number;
  initY: number;
  relativeX: number;
  relativeY: number;
  absoluteX: number;
  absoluteY: number;
}

export const useCalendarDragScreen = (props: UseCalendarDragScreenProps) => {
  const {
    visible,
    calendarRef,
    calendarSize,
    onMouseUp,
    year,
    month,
    level,
    schedule,
  } = props;
  const [calendarPointInfos, setCalendarPointInfos] =
    useState<CalendarPointInfos>({
      initX: 0,
      initY: 0,
      relativeX: 0,
      relativeY: 0,
      absoluteX: 0,
      absoluteY: 0,
    });
  const { relativeX, relativeY, absoluteX, absoluteY } = calendarPointInfos;

  const scheduleBars = generateScheduleBars(year, month, [schedule]).map(
    (scheduleBar) => ({ ...scheduleBar, level, calendarSize }),
  );

  useEffect(() => {
    const onMouseDown = (e: globalThis.MouseEvent) => {
      const { clientX, clientY } = e;

      setCalendarPointInfos((prev) => ({
        ...prev,
        initX: clientX,
        initY: clientY,
      }));
    };

    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!visible) {
        return;
      }

      const calendarElement = calendarRef.current;

      if (!calendarElement) {
        return;
      }

      const { clientX, clientY } = e;
      const { top, left } = calendarElement.getBoundingClientRect();

      setCalendarPointInfos((prev) => ({
        ...prev,
        relativeX: clientX - prev.initX,
        relativeY: clientY - prev.initY,
        absoluteX: clientX - left,
        absoluteY: clientY - top,
      }));
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    visible,
    onMouseUp,
    calendarRef,
    relativeX,
    relativeY,
    absoluteX,
    absoluteY,
  ]);

  return {
    movingScheduleBars: scheduleBars,
    relativeX,
    relativeY,
  };
};
