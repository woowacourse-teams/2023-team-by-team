import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendTeamPlace } from '~/apis/team';

export const useSendTeamPlace = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (inviteCode: string) => sendTeamPlace(inviteCode),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teamPlaces']);
      },
    },
  );

  return { mutateSendTeamPlace: mutate };
};
