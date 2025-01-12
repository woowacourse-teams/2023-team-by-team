import { http, HttpResponse } from 'msw';
import {
  teamPlaces as teamPlacesData,
  inviteTeams,
  INVITE_CODE,
  MEMBERS,
} from '~/mocks/fixtures/team';
import type { TeamInfo, TeamPlace } from '~/types/team';

const teamPlaces = [...teamPlacesData];

export const teamHandlers = [
  // 팀플레이스 목록 조회
  http.get('/api/me/team-places', async () => {
    return HttpResponse.json({ teamPlaces });
  }),

  // 팀플레이스 탈퇴
  http.delete('/api/me/team-places/:teamPlaceId', async ({ params }) => {
    const teamPlaceId = Number(params.teamPlaceId);
    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    teamPlaces.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  // 팀플레이스 생성
  http.post<never, Pick<TeamInfo, 'name'>>(
    '/api/team-places',
    async ({ request }) => {
      const { name } = await request.json();

      if (typeof name !== 'string')
        return new HttpResponse(null, { status: 400 });

      const newId = teamPlaces.length + 1;
      teamPlaces.push({
        id: newId,
        displayName: name,
        teamPlaceColor: 3,
      });

      HttpResponse.json(
        {
          teamPlaceId: newId,
        },
        { status: 201 },
      );
    },
  ),

  // 팀플레이스 참가
  http.post('/api/me/team-places/:inviteCode', async ({ params }) => {
    const inviteCode = params.inviteCode;

    const index = inviteTeams.findIndex(
      (inviteTeam) => inviteTeam.inviteCode === inviteCode,
    );

    if (index === -1) return new HttpResponse(null, { status: 404 });

    teamPlaces.push({
      id: inviteTeams[index].id,
      displayName: inviteTeams[index].displayName,
      teamPlaceColor: inviteTeams[index].teamPlaceColor,
    });

    return HttpResponse.json(
      {
        teamPlaceId: inviteTeams[index].id,
      },
      { status: 201 },
    );
  }),

  // 팀플레이스 초대코드 조회
  http.get('/api/team-places/:teamPlaceId/invite-code', async ({ params }) => {
    const { teamPlaceId } = params;

    return HttpResponse.json({
      teamPlaceId: Number(teamPlaceId),
      inviteCode: INVITE_CODE,
    });
  }),

  // 팀플레이스 팀원 목록 조회
  http.get('/api/team-places/:teamPlaceId/members', async () => {
    return HttpResponse.json({ members: MEMBERS });
  }),

  http.patch<{ teamPlaceId: string }, Pick<TeamPlace, 'teamPlaceColor'>>(
    '/api/team-places/:teamPlaceId/color',
    async ({ request, params }) => {
      const teamPlaceId = Number(params.teamPlaceId);
      const { teamPlaceColor } = await request.json();

      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );
      if (index === -1) return new HttpResponse(null, { status: 403 });

      teamPlaces[index].teamPlaceColor = teamPlaceColor;

      return new HttpResponse(null);
    },
  ),

  // 팀플레이스 내 정보 수정
  http.patch(
    '/api/team-places/:teamPlaceId/members/me',
    async ({ request }) => {
      const newUserInfo = await request.json();
      const me = MEMBERS.find((member) => member.isMe);

      if (!me) {
        return new HttpResponse(null, { status: 404 });
      }

      Object.assign(me, newUserInfo);

      return new HttpResponse(null);
    },
  ),
];
