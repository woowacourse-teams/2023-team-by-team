import { useSendSchedule } from '~/hooks/queries/useSendSchedule';
import { useModal } from '~/hooks/useModal';
import { isYYYYMMDDHHMM } from '~/types/typeGuard';
import { type ChangeEvent, useState, type FormEventHandler } from 'react';
import { useToast } from '~/hooks/useToast';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useDateTimeRange } from '~/hooks/schedule/useDateTimeRange';
import { SCHEDULE_DESCRIPTION_MAX_LENGTH } from '~/constants/calendar';

export const useScheduleAddModal = (clickedDate: Date) => {
  const {
    title,
    description,
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
    handleDescriptionChange,
  } = useDateTimeRange(clickedDate, '', '');
  const [isDescription, setIsDescription] = useState(false);
  const [isDescriptionMaxLength, setIsDescriptionMaxLength] = useState(false);
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { teamPlaceId } = useTeamPlace();
  const { mutateSendSchedule } = useSendSchedule(teamPlaceId);

  const schedule = { title, description, startDate, endDate };
  const times = { startTime, endTime };

  const handleIsDescription = () => {
    setIsDescription((prev) => {
      if (prev) {
        handleDescriptionChange('');
        setIsDescriptionMaxLength(false);
      }
      return !prev;
    });
  };

  const handleDescriptionInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (textarea.value.length > SCHEDULE_DESCRIPTION_MAX_LENGTH) {
      setIsDescriptionMaxLength(true);
    } else {
      setIsDescriptionMaxLength(false);
    }

    handleDescriptionChange(
      textarea.value.slice(0, SCHEDULE_DESCRIPTION_MAX_LENGTH),
    );
  };

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

    mutateSendSchedule(
      {
        title,
        startDateTime,
        endDateTime,
        description,
      },
      {
        onSuccess: () => {
          showToast('success', '일정이 등록되었습니다.');
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
    isAllDay,
    times,
    isDescription,
    isDescriptionMaxLength,

    handlers: {
      handleScheduleChange,
      handleScheduleBlur,
      handleIsAllDayChange,
      handleStartTimeChange,
      handleEndTimeChange,
      handleScheduleSubmit,
      handleIsDescription,
      handleDescriptionInput,
    },
  };
};
