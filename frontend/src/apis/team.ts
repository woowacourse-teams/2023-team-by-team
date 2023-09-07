import { http } from '~/apis/http';
import type { TeamInfo, TeamPlace, UserInfo } from '~/types/team';

interface TeamPlacesResponse {
  teamPlaces: TeamPlace[];
}

interface TeamPlaceInviteCodeResponse {
  teamPlaceId: TeamPlace['id'];
  inviteCode: string;
}

interface TeamPlaceMembersResponse {
  members: Omit<UserInfo, 'email'>[];
}

let teamPlacePromise: Promise<TeamPlacesResponse> | null = null;

export const fetchTeamPlaces = async () => {
  if (teamPlacePromise !== null) {
    return teamPlacePromise;
  }

  teamPlacePromise = http.get<TeamPlacesResponse>('/api/me/team-places');

  const response = await teamPlacePromise;
  teamPlacePromise = null;
  return response;
};

export const fetchTeamPlaceInviteCode = (teamPlaceId: number) => {
  return http.get<TeamPlaceInviteCodeResponse>(
    `/api/team-places/${teamPlaceId}/invite-code`,
  );
};

export const fetchTeamPlaceMembers = (teamPlaceId: number) => {
  return http.get<TeamPlaceMembersResponse>(
    `/api/team-places/${teamPlaceId}/members`,
  );
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
