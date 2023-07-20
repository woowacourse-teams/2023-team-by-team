import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';
import { useModifySchedule } from '~/hooks/queries/useModifySchedule';
import { useModal } from '~/hooks/useModal';
import type { Schedule, ScheduleWithoutId } from '~/types/schedule';

const useScheduleEditModal = (
  scheduleId: Schedule['id'],
  initialSchedule?: Schedule,
) => {
  const [schedule, setSchedule] = useState({
    title: initialSchedule?.title,
    startDateTime: initialSchedule?.startDateTime,
    endDateTime: initialSchedule?.endDateTime,
  });
  const { closeModal } = useModal();
  const { mutateModifySchedule } = useModifySchedule(scheduleId);

  const handleScheduleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { title, startDateTime, endDateTime } = schedule;

    if (
      typeof title !== 'string' ||
      typeof startDateTime !== 'string' ||
      typeof endDateTime !== 'string'
    )
      return;

    mutateModifySchedule(
      {
        teamPlaceId: 1,
        body: {
          title,
          startDateTime: startDateTime.replace(
            'T',
            ' ',
          ) as ScheduleWithoutId['startDateTime'],
          endDateTime: endDateTime.replace(
            'T',
            ' ',
          ) as ScheduleWithoutId['endDateTime'],
        },
      },
      {
        onSuccess: () => closeModal(),
      },
    );
  };

  return {
    schedule,

    handlers: {
      handleScheduleChange,
      handleScheduleSubmit,
    },
  };
};

export default useScheduleEditModal;
