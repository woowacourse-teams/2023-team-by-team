import { useState } from 'react';
import { useSendSchedule } from '~/hooks/queries/useSendSchedule';
import { useModal } from '~/hooks/useModal';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';
import { parseDate } from '~/utils/parseDate';
import { parseAmPmTime } from '~/utils/parseAmPmTime';
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
  const [times, setTimes] = useState({
    startTime: '오전 12:00',
    endTime: '오전 12:00',
  });
  const [isAllDay, setIsAllDay] = useState(false);
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

  const handleStartTimeChange = (value: string) => {
    if (!isValidEndTime(value, times['endTime'])) {
      setTimes((prev) => {
        return {
          ...prev,
          ['startTime']: value,
          ['endTime']: value,
        };
      });

      return;
    }

    setTimes((prev) => {
      return {
        ...prev,
        ['startTime']: value,
      };
    });
  };

  const handleEndTimeChange = (value: string) => {
    if (!isValidEndTime(times['startTime'], value)) {
      setTimes((prev) => {
        return {
          ...prev,
          ['endTime']: prev['startTime'],
        };
      });

      return;
    }

    setTimes((prev) => {
      return {
        ...prev,
        ['endTime']: value,
      };
    });
  };

  const isValidEndTime = (startTime: string, endTime: string) => {
    const { startDateTime, endDateTime } = schedule;
    const start = new Date(`${startDateTime} ${parseAmPmTime(startTime)}`);
    const end = new Date(`${endDateTime} ${parseAmPmTime(endTime)}`);

    return start < end;
  };

  const handleIsAllDayChange = () => {
    setIsAllDay((prev) => !prev);
  };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { title, startDateTime, endDateTime } = schedule;
    const { startTime, endTime } = times;
    const formattedStartDateTime = `${startDateTime} ${parseAmPmTime(
      startTime,
    )}`;
    const formattedEndDateTime = `${endDateTime} ${parseAmPmTime(endTime)}`;

    if (
      !isYYYYMMDDHHMM(formattedStartDateTime) ||
      !isYYYYMMDDHHMM(formattedEndDateTime)
    ) {
      return;
    }

    mutateSendSchedule(
      {
        title,
        startDateTime: formattedStartDateTime,
        endDateTime: formattedEndDateTime,
      },
      {
        onSuccess: () => closeModal(),
      },
    );
  };

  return {
    schedule,
    isAllDay,
    times,

    handlers: {
      handleScheduleChange,
      handleIsAllDayChange,
      handleStartTimeChange,
      handleEndTimeChange,
      handleScheduleSubmit,
    },
  };
};

export default useScheduleAddModal;
