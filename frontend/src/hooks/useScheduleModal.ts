import { useEffect, useState } from 'react';
import type { ScheduleBar } from '~/components/ScheduleBar/ScheduleBar';
import { useDeleteSchedule } from '~/hooks/queries/useDeleteSchedule';
import { useFetchScheduleById } from '~/hooks/queries/useFetchScheduleById';
import { useModal } from '~/hooks/useModal';
import type { SchedulePosition } from '~/types/schedule';

export const useScheduleModal = (scheduleBars: ScheduleBar[]) => {
  const [modalScheduleId, setModalScheduleId] = useState<number>(
    scheduleBars[0].scheduleId,
  );
  const [modalPosition, setModalPosition] = useState<SchedulePosition>({
    row: 0,
    column: 0,
    level: 0,
  });
  const { openModal, closeModal } = useModal();
  const { scheduleById } = useFetchScheduleById(1, modalScheduleId);
  const { mutateScheduleDelete } = useDeleteSchedule(1, modalScheduleId);

  useEffect(() => {
    setModalScheduleId(scheduleBars[0].scheduleId);
  }, []);

  const handleScheduleModalOpen = (
    scheduleId: number,
    row: number,
    column: number,
    level: number,
  ) => {
    setModalScheduleId(scheduleId);
    setModalPosition({ row, column, level });
    openModal();
  };

  const onScheduleDelete = () => {
    closeModal();
    mutateScheduleDelete();
  };

  return {
    modalPosition,
    scheduleById,

    handlers: {
      handleScheduleModalOpen,
      onScheduleDelete,
    },
  };
};
