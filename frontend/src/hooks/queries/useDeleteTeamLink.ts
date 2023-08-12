import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamLink } from '~/apis/link';
import { useToast } from '../useToast';

export const useDeleteTeamLink = (teamPlaceId: number) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate } = useMutation(
    (teamLinkId: number) => deleteTeamLink(teamPlaceId, teamLinkId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamLinks', teamPlaceId]),
          showToast('success', '링크를 삭제했습니다.');
      },
      onError: () => {
        showToast(
          'error',
          '링크를 삭제하는 데 실패했습니다. 잠시 후 다시 시도해 주세요.',
        );
      },
    },
  );

  return { mutateDeleteTeamLink: mutate };
};
