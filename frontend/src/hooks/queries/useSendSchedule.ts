import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendSchedule } from '~/apis/schedule';
import type { ScheduleWithoutId } from '~/types/schedule';

export const useSendSchedule = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ teamPlaceId, body }: { teamPlaceId: number; body: ScheduleWithoutId }) =>
      sendSchedule(teamPlaceId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedules']);
      },
    },
  );

  return { mutateSendSchedule: mutate };
};
