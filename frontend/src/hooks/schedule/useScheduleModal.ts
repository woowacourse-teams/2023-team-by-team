import { useState } from 'react';
import { useModal } from '~/hooks/useModal';
import type { SchedulePosition } from '~/types/schedule';

export const useScheduleModal = () => {
  const [modalScheduleId, setModalScheduleId] = useState(0);
  const [modalPosition, setModalPosition] = useState<SchedulePosition>({
    row: 0,
    column: 0,
    level: 0,
  });
  const { openModal } = useModal();

  const handleScheduleModalOpen = ({
    scheduleId,
    row,
    column,
    level,
  }: SchedulePosition & { scheduleId: number }) => {
    setModalScheduleId(() => scheduleId);
    setModalPosition(() => {
      return {
        row,
        column,
        level,
      };
    });
    openModal();
  };

  return {
    modalPosition,
    modalScheduleId,
    handlers: { handleScheduleModalOpen },
  };
};
