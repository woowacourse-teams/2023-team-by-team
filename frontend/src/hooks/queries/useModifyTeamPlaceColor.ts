import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyTeamPlaceColor } from '~/apis/team';
import type { TeamPlace } from '~/types/team';

export const useModifyTeamPlaceColor = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: Pick<TeamPlace, 'teamPlaceColor'>) =>
      modifyTeamPlaceColor(teamPlaceId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamPlaces']);
      },
    },
  );

  return { mutateModifyTeamPlaceColor: mutate };
};
