import { useState } from 'react';
import { useSendSchedule } from '~/hooks/queries/useSendSchedule';
import { useModal } from '~/hooks/useModal';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';
import { parseDate } from '~/utils/parseDate';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useToast } from '~/hooks/useToast';
import { useTeamPlace } from '~/hooks/useTeamPlace';

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
    startTime: '00:00',
    endTime: '00:00',
  });
  const [isAllDay, setIsAllDay] = useState(false);
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { teamPlaceId } = useTeamPlace();
  const { mutateSendSchedule } = useSendSchedule(teamPlaceId);

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
    const start = new Date(`${startDateTime} ${startTime}`);
    const end = new Date(`${endDateTime} ${endTime}`);

    return start < end;
  };

  const handleIsAllDayChange = () => {
    setIsAllDay((prev) => !prev);
  };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { title, startDateTime, endDateTime } = schedule;
    const { startTime, endTime } = times;
    const formattedStartDateTime = `${startDateTime} ${
      isAllDay ? '00:00' : startTime
    }`;
    const formattedEndDateTime = `${endDateTime} ${
      isAllDay ? '23:59' : endTime
    }`;

    if (
      !isYYYYMMDDHHMM(formattedStartDateTime) ||
      !isYYYYMMDDHHMM(formattedEndDateTime)
    ) {
      return;
    }

    if (!isValidEndTime(startTime, endTime) && !isAllDay) {
      showToast('error', '마감 시간은 시작 시간 이후여야 합니다.');
      return;
    }

    mutateSendSchedule(
      {
        title,
        startDateTime: formattedStartDateTime,
        endDateTime: formattedEndDateTime,
      },
      {
        onSuccess: () => {
          showToast('success', '일정이 등록되었습니다.');
          closeModal();
        },
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
