import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule } from '~/apis/schedule';

export const useDeleteSchedule = (teamPlaceId: number, scheduleId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    () => deleteSchedule(teamPlaceId, scheduleId),
    {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ['schedules'] });
      },
    },
  );

  return { mutateScheduleDelete: mutate };
};
