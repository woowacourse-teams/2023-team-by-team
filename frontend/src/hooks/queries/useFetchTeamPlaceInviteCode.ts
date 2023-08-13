import { useQuery } from '@tanstack/react-query';
import { fetchTeamPlaceInviteCode } from '~/apis/team';

export const useFetchTeamPlaceInviteCode = (teamPlaceId: number) => {
  const { data } = useQuery(['teamPlaceInviteCode', teamPlaceId], () =>
    fetchTeamPlaceInviteCode(teamPlaceId),
  );

  const { teamPlaceId: id, inviteCode } = data ?? {};

  return { id, inviteCode };
};
