import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Schedule } from '~/types/schedule';

interface DragStatus {
  isDragging: boolean;
  level: number;
  schedule: Schedule;
}

export const useScheduleDragStatus = () => {
  const [dragStatus, setDragStatus] = useState<DragStatus>({
    isDragging: false,
    level: 0,
    schedule: {} as Schedule,
  });

  const handleDragStart = (level: number, schedule: Schedule) => {
    setDragStatus(() => ({
      isDragging: true,
      schedule,
      level,
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
    }));
  };

  return { dragStatus, handleDragStart, handleMouseUp };
};
