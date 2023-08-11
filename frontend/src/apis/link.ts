import { http } from '~/apis/http';
import type { TeamLink } from '~/types/link';

export const sendTeamLink = (teamPlaceId: number, body: TeamLink) => {
  return http.post(`/api/team-place/${teamPlaceId}/team-links`, body);
};
