import { http } from '~/apis/http';
import type { TeamInfo, TeamPlace } from '~/types/team';

export const fetchTeamPlaces = () => {
  return http.get<{
    teamPlaces: TeamPlace[];
  }>('/api/me/team-places');
};

export const fetchTeamPlaceInviteCode = (teamPlaceId: number) => {
  return http.get<{
    teamPlaceId: number;
    inviteCode: string;
  }>(`/api/team-places/${teamPlaceId}/invite-code`);
};

export const fetchTeamPlaceMembers = (teamPlaceId: number) => {
  return http.get<{
    members: {
      id: number;
      name: string;
      profileImageUrl: string;
    }[];
  }>(`/api/team-places/${teamPlaceId}/members`);
};

export const deleteTeamPlace = (teamPlaceId: number) => {
  return http.delete(`/api/me/team-places/${teamPlaceId}`);
};

export const sendJoinTeamPlace = (inviteCode: string) => {
  return http.post(`/api/me/team-places/${inviteCode}`, {});
};

export const sendCreateTeamPlace = (body: Pick<TeamInfo, 'name'>) => {
  return http.post('/api/team-places', body);
};
