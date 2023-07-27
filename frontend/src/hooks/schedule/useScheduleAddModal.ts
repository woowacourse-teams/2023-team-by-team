import { useState } from 'react';
import { useSendSchedule } from '~/hooks/queries/useSendSchedule';
import { useModal } from '~/hooks/useModal';
import { formatISOString } from '~/utils/formatISOString';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';
import { parseDate } from '~/utils/parseDate';
import type { ChangeEventHandler, FormEventHandler } from 'react';

const useScheduleAddModal = (clickedDate: Date) => {
  const { year, month, date } = parseDate(clickedDate);
  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(
    date,
  ).padStart(2, '0')}`;
  const [schedule, setSchedule] = useState({
    title: '',
    startDateTime: dateString,
    endDateTime: dateString,
  });
  const { closeModal } = useModal();
  const { mutateSendSchedule } = useSendSchedule();

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

    const { title, startDateTime, endDateTime } = schedule;
    const formattedStartDateTime = formatISOString(startDateTime);
    const formattedEndDateTime = formatISOString(endDateTime);

    if (
      !isYYYYMMDDHHMM(formattedStartDateTime) ||
      !isYYYYMMDDHHMM(formattedEndDateTime)
    ) {
      return;
    }

    mutateSendSchedule(
      {
        teamPlaceId: 1,
        body: {
          title,
          startDateTime: formattedStartDateTime,
          endDateTime: formattedEndDateTime,
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

export default useScheduleAddModal;
