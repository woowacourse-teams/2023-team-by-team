import { useState } from 'react';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';
import { useModifySchedule } from '~/hooks/queries/useModifySchedule';
import type { MouseEvent } from 'react';
import type { Schedule, YYYYMMDDHHMM, DragStatus } from '~/types/schedule';

export const useScheduleDragStatus = () => {
  const [dragStatus, setDragStatus] = useState<DragStatus>({
    isDragging: false,
    level: 0,
    schedule: null,
    initX: 0,
    initY: 0,
  });
  const { showToast } = useToast();
  const { teamPlaceId } = useTeamPlace();
  const scheduleId = dragStatus.schedule === null ? 0 : dragStatus.schedule.id;
  const { mutateModifySchedule } = useModifySchedule(teamPlaceId, scheduleId);

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

  const handleMouseUp = (
    title: string,
    startDateTime: YYYYMMDDHHMM,
    endDateTime: YYYYMMDDHHMM,
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

          setDragStatus((prev) => ({
            ...prev,
            schedule: null,
          }));
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
