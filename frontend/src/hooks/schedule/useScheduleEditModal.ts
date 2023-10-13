import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';
import { useModifySchedule } from '~/hooks/queries/useModifySchedule';
import { useModal } from '~/hooks/useModal';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';
import type { Schedule } from '~/types/schedule';
import { useToast } from '~/hooks/useToast';
import { useTeamPlace } from '~/hooks/useTeamPlace';

const useScheduleEditModal = (
  scheduleId: Schedule['id'],
  initialSchedule?: Schedule,
) => {
  const { teamPlaceId } = useTeamPlace();
  const [startDate, startTime] = initialSchedule?.startDateTime.split(' ') ?? [
    '',
  ];
  const [endDate, endTime] = initialSchedule?.endDateTime.split(' ') ?? [''];
  const [schedule, setSchedule] = useState({
    title: initialSchedule?.title,
    startDate,
    endDate,
  });
  const [times, setTimes] = useState({
    startTime,
    endTime: endTime === '23:59' ? '23:30' : endTime,
  });
  const [isAllDay, setIsAllDay] = useState(endTime === '23:59');
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { mutateModifySchedule } = useModifySchedule(teamPlaceId, scheduleId);

  const handleIsAllDayChange = () => {
    setIsAllDay((prev) => !prev);
  };

  const handleScheduleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
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
    const { startDate, endDate } = schedule;
    const start = new Date(`${startDate} ${startTime}`);
    const end = new Date(`${endDate} ${endTime}`);

    return start < end;
  };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { title, startDate, endDate } = schedule;
    const { startTime, endTime } = times;
    if (
      typeof title !== 'string' ||
      typeof startDate !== 'string' ||
      typeof endDate !== 'string'
    )
      return;

    const formattedStartDateTime = `${startDate} ${
      isAllDay ? '00:00' : startTime
    }`;
    const formattedEndDateTime = `${endDate} ${isAllDay ? '23:59' : endTime}`;

    if (
      !isYYYYMMDDHHMM(formattedStartDateTime) ||
      !isYYYYMMDDHHMM(formattedEndDateTime)
    ) {
      return;
    }

    mutateModifySchedule(
      {
        title,
        startDateTime: formattedStartDateTime,
        endDateTime: formattedEndDateTime,
      },
      {
        onSuccess: () => {
          showToast('success', '일정이 수정되었습니다.');
          closeModal();
        },
        onError: (error) => {
          const response = error as Response;
          if (response.status === 500)
            showToast('error', '일정 제목이 최대 글자(250자)를 초과했습니다.');
        },
      },
    );
  };

  return {
    schedule,
    times,
    isAllDay,

    handlers: {
      handleScheduleChange,
      handleScheduleSubmit,
      handleStartTimeChange,
      handleEndTimeChange,
      handleIsAllDayChange,
    },
  };
};

export default useScheduleEditModal;
