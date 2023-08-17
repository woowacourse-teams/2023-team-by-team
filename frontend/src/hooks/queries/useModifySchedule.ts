import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifySchedule } from '~/apis/schedule';
import type { Schedule, ScheduleWithoutId } from '~/types/schedule';

export const useModifySchedule = (
  teamPlaceId: number,
  scheduleId: Schedule['id'],
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: ScheduleWithoutId) => modifySchedule(teamPlaceId, scheduleId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedules', teamPlaceId]);
        queryClient.invalidateQueries(['schedule', teamPlaceId, scheduleId]);
        queryClient.invalidateQueries(['mySchedules']);
        queryClient.invalidateQueries(['myDailySchedules']);
        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      },
    },
  );

  return { mutateModifySchedule: mutate };
};
