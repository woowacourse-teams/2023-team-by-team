import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Schedule } from '~/types/schedule';

interface DragStatus {
  isDragging: boolean;
  level: number;
  schedule: Schedule;
  initX: number;
  initY: number;
}

export const useScheduleDragStatus = () => {
  const [dragStatus, setDragStatus] = useState<DragStatus>({
    isDragging: false,
    level: 0,
    schedule: {} as Schedule,
    initX: 0,
    initY: 0,
  });

  const handleDragStart = (
    e: MouseEvent,
    level: number,
    schedule: Schedule,
  ) => {
    const { clientX, clientY } = e;

    setDragStatus(() => ({
      isDragging: true,
      schedule,
      level,
      initX: clientX,
      initY: clientY,
    }));
  };

  const handleMouseUp = () => {
    if (!dragStatus.isDragging) {
      return;
    }

    setDragStatus(() => ({
      isDragging: false,
      level: 0,
      schedule: {} as Schedule,
      initX: 0,
      initY: 0,
    }));
  };

  return { dragStatus, handleDragStart, handleMouseUp };
};
