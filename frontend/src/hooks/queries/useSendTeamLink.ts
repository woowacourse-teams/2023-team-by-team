import { useMutation } from '@tanstack/react-query';
import { sendTeamLink } from '~/apis/link';
import type { TeamLinkWithOutInfo } from '~/types/link';

export const useSendTeamLink = (teamPlaceId: number) => {
  const { mutate } = useMutation((body: TeamLinkWithOutInfo) =>
    sendTeamLink(teamPlaceId, body),
  );

  return { mutateSendTeamLink: mutate };
};
