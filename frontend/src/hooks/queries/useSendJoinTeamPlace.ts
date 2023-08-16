import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendJoinTeamPlace } from '~/apis/team';

export const useSendJoinTeamPlace = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (inviteCode: string) => sendJoinTeamPlace(inviteCode),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamPlaces']);
      },
    },
  );

  return { mutateSendJoinTeamPlace: mutate };
};
