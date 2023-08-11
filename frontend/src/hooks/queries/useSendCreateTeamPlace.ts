import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendCreateTeamPlace } from '~/apis/team';
import type { TeamInfo } from '~/types/team';

export const useSendCreateTeamPlace = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: Pick<TeamInfo, 'name'>) => sendCreateTeamPlace(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamPlaces']);
      },
    },
  );

  return { mutateSendCreateTeamPlace: mutate };
};
