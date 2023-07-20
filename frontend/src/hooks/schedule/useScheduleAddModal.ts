import { useState } from 'react';
import { useSendSchedule } from '~/hooks/queries/useSendSchedule';
import { useModal } from '~/hooks/useModal';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import type { ScheduleWithoutId } from '~/types/schedule';

const useScheduleAddModal = () => {
  const [schedule, setSchedule] = useState({
    title: '',
    startDateTime: '2023-07-20T00:00',
    endDateTime: '2023-07-20T00:00',
  });
  const { closeModal } = useModal();
  const { mutateSendSchedule } = useSendSchedule(1);

  const handleScheduleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setSchedule((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { startDateTime, endDateTime } = schedule;

    mutateSendSchedule(
      {
        ...schedule,
        startDateTime: startDateTime.replace(
          'T',
          ' ',
        ) as ScheduleWithoutId['startDateTime'],
        endDateTime: endDateTime.replace(
          'T',
          ' ',
        ) as ScheduleWithoutId['startDateTime'],
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

export default useScheduleAddModal;
