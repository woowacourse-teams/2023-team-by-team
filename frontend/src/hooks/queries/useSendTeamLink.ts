import { useMutation } from '@tanstack/react-query';
import { sendTeamLink } from '~/apis/link';
import type { TeamLink } from '~/types/link';

export const useSendTeamLink = (teamPlaceId: number) => {
  const { mutate } = useMutation((body: TeamLink) =>
    sendTeamLink(teamPlaceId, body),
  );

  return { mutateSendTeamLink: mutate };
};
