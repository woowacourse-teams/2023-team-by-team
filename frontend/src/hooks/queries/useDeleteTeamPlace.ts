import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamPlace } from '~/apis/team';

export const useDeleteTeamPlace = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteTeamPlace(teamPlaceId), {
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return { mutateDeleteTeamPlace: mutate };
};
