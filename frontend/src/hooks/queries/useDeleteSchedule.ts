import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule } from '~/apis/schedule';

export const useDeleteSchedule = (teamPlaceId: number, scheduleId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    () => deleteSchedule(teamPlaceId, scheduleId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedules', teamPlaceId]);
        queryClient.removeQueries(['schedule', teamPlaceId, scheduleId]);
      },
      onError: () => {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        throw new Error();
      },
    },
  );

  return { mutateDeleteSchedule: mutate };
};
