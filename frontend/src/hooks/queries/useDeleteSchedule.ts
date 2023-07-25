import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule } from '~/apis/schedule';

export const useDeleteSchedule = (scheduleId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (teamPlaceId: number) => deleteSchedule(teamPlaceId, scheduleId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedules']);
        queryClient.removeQueries(['schedule', scheduleId]);
      },
      onError: () => {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        throw new Error();
      },
    },
  );

  return { mutateDeleteSchedule: mutate };
};
