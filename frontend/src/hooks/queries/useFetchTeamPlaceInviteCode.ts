import { useQuery } from '@tanstack/react-query';
import { fetchTeamPlaceInviteCode } from '~/apis/team';
import { STALE_TIME } from '~/constants/query';

export const useFetchTeamPlaceInviteCode = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['teamPlaceInviteCode', teamPlaceId],
    () => fetchTeamPlaceInviteCode(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.TEAM_PLACE_INVITE_CODE,
    },
  );

  const { teamPlaceId: id, inviteCode } = data ?? {};

  return { id, inviteCode };
};
