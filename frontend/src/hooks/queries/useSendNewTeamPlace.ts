import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendNewTeamPlace } from '~/apis/team';
import type { TeamInfo } from '~/types/team';

export const useSendNewTeamPlace = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: Pick<TeamInfo, 'name'>) => sendNewTeamPlace(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamPlaces']);
      },
    },
  );

  return { mutateSendNewTeamPlace: mutate };
};
