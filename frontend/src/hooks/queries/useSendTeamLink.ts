import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendTeamLink } from '~/apis/link';
import type { TeamLinkWithoutInfo } from '~/types/link';

export const useSendTeamLink = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: TeamLinkWithoutInfo) => sendTeamLink(teamPlaceId, body),
    {
      onSuccess: () => queryClient.invalidateQueries(['teamLinks']),
    },
  );

  return { mutateSendTeamLink: mutate };
};
