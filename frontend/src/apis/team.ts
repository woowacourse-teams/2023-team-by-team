import { http } from '~/apis/http';
import type { TeamInfo, TeamPlace } from '~/types/team';

export const fetchTeamPlaces = () => {
  return http.get<{
    teamPlaces: TeamPlace[];
  }>('/api/me/team-places');
};

export const sendJoinTeamPlace = (inviteCode: string) => {
  return http.post(`/api/me/team-places/${inviteCode}`, {});
};

export const sendCreateTeamPlace = (body: Pick<TeamInfo, 'name'>) => {
  return http.post('/api/team-places', body);
};
