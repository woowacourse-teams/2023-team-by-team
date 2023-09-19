import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyMyTeamPlaceUserInfo } from '~/apis/team';
import type { UserInfo } from '~/types/team';

export const useModifyMyTeamPlaceUserInfo = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (body: Pick<UserInfo, 'name'>) =>
      modifyMyTeamPlaceUserInfo(teamPlaceId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamPlaceMembers']);
      },
    },
  );

  return {
    mutateModifyMyTeamPlaceUserInfo: mutate,
  };
};
