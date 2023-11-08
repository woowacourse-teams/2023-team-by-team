import { useState, useEffect } from 'react';
import { generateMovingScheduleBars } from './generateMovingScheduleBars';
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
  calendarWidth: number;
  calendarHeight: number;
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
      calendarWidth: 0,
      calendarHeight: 0,
    });
  const { initX, initY, relativeX, relativeY, calendarWidth, calendarHeight } =
    calendarPointInfos;

  const scheduleBars = visible
    ? generateMovingScheduleBars({
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

      const { clientX, clientY } = e;

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

    document.addEventListener('mousedown', onMouseDown);
    calendarElement.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    resizeObserver.observe(calendarElement);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      calendarElement.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
    };
  }, [visible, onMouseUp, calendarRef, relativeX, relativeY, initX, initY]);

  return {
    movingScheduleBars: scheduleBars,
    relativeX: relativeX % (calendarWidth / 7),
    relativeY,
  };
};
