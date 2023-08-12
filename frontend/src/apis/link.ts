import { http } from '~/apis/http';
import type { TeamLinkWithOutInfo } from '~/types/link';

export const sendTeamLink = (
  teamPlaceId: number,
  body: TeamLinkWithOutInfo,
) => {
  return http.post(`/api/team-place/${teamPlaceId}/team-links`, body);
};
