import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Schedule } from '~/types/schedule';

interface DragStatus {
  isDragging: boolean;
  level: number;
  schedule: Schedule;
  initMouseX: number;
  initMouseY: number;
}

export const useScheduleDragStatus = () => {
  const [dragStatus, setDragStatus] = useState<DragStatus>({
    isDragging: false,
    level: 0,
    schedule: {} as Schedule,
    initMouseX: 0,
    initMouseY: 0,
  });

  const handleDragStart = (
    e: MouseEvent,
    level: number,
    schedule: Schedule,
  ) => {
    setDragStatus(() => ({
      isDragging: true,
      schedule,
      level,
      initMouseX: e.clientX,
      initMouseY: e.clientY,
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
      initMouseX: 0,
      initMouseY: 0,
    }));
  };

  return { dragStatus, handleDragStart, handleMouseUp };
};
