import { useMutation } from '@tanstack/react-query';
import { sendTeamLink } from '~/apis/link';
import type { TeamLinkWithoutInfo } from '~/types/link';

export const useSendTeamLink = (teamPlaceId: number) => {
  const { mutate } = useMutation((body: TeamLinkWithoutInfo) =>
    sendTeamLink(teamPlaceId, body),
  );

  return { mutateSendTeamLink: mutate };
};
