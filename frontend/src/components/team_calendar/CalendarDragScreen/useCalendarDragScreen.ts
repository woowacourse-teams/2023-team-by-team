import { useState, useEffect } from 'react';
import { generateScheduleBars } from '~/utils/generateScheduleBars';
import type { Schedule, Point } from '~/types/schedule';
import type { CalendarSize } from '~/types/size';

interface UseCalendarDragScreenProps {
  visible: boolean;
  calendarSize: CalendarSize;
  onMouseUp: () => void;
  year: number;
  month: number;
  level: number;
  schedule: Schedule;
  initMouseX: number;
  initMouseY: number;
}

export const useCalendarDragScreen = (props: UseCalendarDragScreenProps) => {
  const {
    visible,
    calendarSize,
    onMouseUp,
    year,
    month,
    level,
    schedule,
    initMouseX,
    initMouseY,
  } = props;
  const [relativePoint, setRelativePoint] = useState<Point>({
    x: initMouseX,
    y: initMouseY,
  });

  const scheduleBars = generateScheduleBars(year, month, [schedule]).map(
    (scheduleBar) => ({ ...scheduleBar, level, calendarSize }),
  );

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!visible) {
        return;
      }

      const { clientX, clientY } = e;

      setRelativePoint(() => ({
        x: clientX - initMouseX,
        y: clientY - initMouseY,
      }));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [visible, onMouseUp, initMouseX, initMouseY]);

  return {
    movingScheduleBars: scheduleBars,
    relativeX: relativePoint.x,
    relativeY: relativePoint.y,
  };
};
