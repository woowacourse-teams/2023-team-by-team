import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifySchedule } from '~/apis/schedule';
import type { Schedule, ScheduleWithoutId } from '~/types/schedule';

export const useModifySchedule = (scheduleId: Schedule['id']) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ teamPlaceId, body }: { teamPlaceId: number; body: ScheduleWithoutId }) =>
      modifySchedule(teamPlaceId, scheduleId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedules']);
        queryClient.invalidateQueries(['schedule', scheduleId]);
      },
    },
  );

  return { mutateModifySchedule: mutate };
};
