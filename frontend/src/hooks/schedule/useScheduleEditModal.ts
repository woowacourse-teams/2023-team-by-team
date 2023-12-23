import { useModifySchedule } from '~/hooks/queries/useModifySchedule';
import { useModal } from '~/hooks/useModal';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';
import type { FormEventHandler } from 'react';
import type { Schedule } from '~/types/schedule';
import { useToast } from '~/hooks/useToast';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useDateTimeRange } from '~/hooks/schedule/useDateTimeRange';

export const useScheduleEditModal = (
  scheduleId: Schedule['id'],
  initialSchedule?: Schedule,
) => {
  const {
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    isValid,
    isAllDay,
    handleScheduleChange,
    handleScheduleBlur,
    handleStartTimeChange,
    handleEndTimeChange,
    handleIsAllDayChange,
  } = useDateTimeRange(initialSchedule, initialSchedule?.title);
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { teamPlaceId } = useTeamPlace();
  const { mutateModifySchedule } = useModifySchedule(teamPlaceId, scheduleId);

  const schedule = { title, startDate, endDate };
  const times = { startTime, endTime };

  const handleScheduleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const startDateTime = `${startDate} ${startTime}`;
    const endDateTime = `${endDate} ${endTime}`;

    if (!isYYYYMMDDHHMM(startDateTime) || !isYYYYMMDDHHMM(endDateTime)) {
      return;
    }

    if (!isValid) {
      showToast(
        'error',
        '날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요.',
      );
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
      handleScheduleBlur,
      handleScheduleSubmit,
      handleStartTimeChange,
      handleEndTimeChange,
      handleIsAllDayChange,
    },
  };
};
