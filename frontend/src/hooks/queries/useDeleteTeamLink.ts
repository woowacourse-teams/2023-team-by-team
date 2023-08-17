import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamLink } from '~/apis/link';

export const useDeleteTeamLink = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (teamLinkId: number) => deleteTeamLink(teamPlaceId, teamLinkId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamLinks', teamPlaceId]);
        queryClient.invalidateQueries(['threadData', teamPlaceId]);
      },
    },
  );

  return { mutateDeleteTeamLink: mutate };
};
