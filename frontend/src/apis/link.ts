import { http } from '~/apis/http';
import type { TeamLink, TeamLinkWithoutInfo } from '~/types/link';

interface TeamLinksResponse {
  teamLinks: TeamLink[];
}

export const sendTeamLink = (
  teamPlaceId: number,
  body: TeamLinkWithoutInfo,
) => {
  return http.post(`/api/team-place/${teamPlaceId}/team-links`, body);
};

export const fetchTeamLinks = (teamPlaceId: number) => {
  return http.get<TeamLinksResponse>(
    `/api/team-place/${teamPlaceId}/team-links`,
  );
};

export const deleteTeamLink = (teamPlaceId: number, teamLinkId: number) => {
  return http.delete(`/api/team-place/${teamPlaceId}/team-links/${teamLinkId}`);
};
