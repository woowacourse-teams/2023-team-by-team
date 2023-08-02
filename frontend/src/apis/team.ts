import { http } from '~/apis/http';
import type { TeamPlace } from '~/types/team';

export const fetchTeamPlaces = () => {
  return http.get<{
    teamPlaces: TeamPlace[];
  }>('/api/me/team-places');
};
