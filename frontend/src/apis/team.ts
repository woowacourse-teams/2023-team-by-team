import { http } from '~/apis/http';
import type { TeamInfo, TeamPlace } from '~/types/team';

export const fetchTeamPlaces = () => {
  return http.get<{
    teamPlaces: TeamPlace[];
  }>('/api/me/team-places');
};

export const sendTeamPlace = (inviteCode: string) => {
  return http.post<Pick<TeamInfo, 'teamPlaceId'>>(
    `/api/me/team-places/${inviteCode}`,
    {},
  );
};

export const sendNewTeamPlace = (body: Pick<TeamInfo, 'name'>) => {
  return http.post<Pick<TeamInfo, 'teamPlaceId'>>('/api/team-places', body);
};
