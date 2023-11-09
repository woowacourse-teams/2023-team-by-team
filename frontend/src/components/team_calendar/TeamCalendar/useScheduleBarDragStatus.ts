import { useState } from 'react';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';
import { useModifySchedule } from '~/hooks/queries/useModifySchedule';
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
  const { showToast } = useToast();
  const { teamPlaceId } = useTeamPlace();
  const scheduleId = dragStatus.schedule.id;
  const { mutateModifySchedule } = useModifySchedule(teamPlaceId, scheduleId);

  const handleDragStart = (
    e: MouseEvent,
    level: number,
    schedule: Schedule,
    shouldUpdate: boolean,
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

  const handleMouseUp = (
    title: string,
    startDateTime: Schedule['startDateTime'],
    endDateTime: Schedule['endDateTime'],
    shouldUpdate: boolean,
  ) => {
    if (!dragStatus.isDragging) {
      return;
    }

    setDragStatus((prev) => ({
      ...prev,
      isDragging: false,
    }));

    if (!shouldUpdate) {
      return;
    }

    mutateModifySchedule(
      {
        title,
        startDateTime,
        endDateTime,
      },
      {
        onSuccess: () => {
          showToast('success', '일정이 수정되었습니다.');
        },
        onError: (error) => {
          const response = error as Response;
          if (response.status === 500)
            showToast('error', '일정 제목이 최대 글자(250자)를 초과했습니다.');
        },
      },
    );
  };

  return { dragStatus, handleDragStart, handleMouseUp };
};
