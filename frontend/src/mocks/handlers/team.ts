import { rest } from 'msw';
import {
  teamPlaces as teamPlacesData,
  inviteTeams,
  INVITE_CODE,
  MEMBERS,
} from '~/mocks/fixtures/team';

const teamPlaces = [...teamPlacesData];

export const teamHandlers = [
  // 팀플레이스 목록 조회
  rest.get('/api/me/team-places', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ teamPlaces }));
  }),

  // 팀플레이스 탈퇴
  rest.delete('/api/me/team-places/:teamPlaceId', async (req, res, ctx) => {
    const teamPlaceId = Number(req.params.teamPlaceId);
    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );

    if (index === -1) {
      return res(ctx.status(404));
    }

    teamPlaces.splice(index, 1);

    return res(ctx.status(204));
  }),

  // 팀플레이스 생성
  rest.post('/api/team-places', async (req, res, ctx) => {
    const { name } = await req.json();

    if (typeof name !== 'string') return res(ctx.status(400));

    const newId = teamPlaces.length + 1;
    teamPlaces.push({
      id: newId,
      displayName: name,
      teamPlaceColor: 3,
    });

    return res(ctx.status(201), ctx.json({ teamPlaceId: newId }));
  }),

  // 팀플레이스 참가
  rest.post('/api/me/team-places/:inviteCode', async (req, res, ctx) => {
    const inviteCode = req.params.inviteCode;

    const index = inviteTeams.findIndex(
      (inviteTeam) => inviteTeam.inviteCode === inviteCode,
    );

    if (index === -1) return res(ctx.status(404));

    teamPlaces.push({
      id: inviteTeams[index].id,
      displayName: inviteTeams[index].displayName,
      teamPlaceColor: inviteTeams[index].teamPlaceColor,
    });

    return res(
      ctx.status(201),
      ctx.json({ teamPlaceId: inviteTeams[index].id }),
    );
  }),

  // 팀플레이스 초대코드 조회
  rest.get(
    '/api/team-places/:teamPlaceId/invite-code',
    async (req, res, ctx) => {
      const { teamPlaceId } = req.params;

      return res(
        ctx.status(200),
        ctx.json({
          teamPlaceId: Number(teamPlaceId),
          inviteCode: INVITE_CODE,
        }),
      );
    },
  ),

  // 팀플레이스 팀원 목록 조회
  rest.get('/api/team-places/:teamPlaceId/members', async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        members: MEMBERS,
      }),
    );
  }),

  rest.patch('/api/team-places/:teamPlaceId/color', async (req, res, ctx) => {
    const teamPlaceId = Number(req.params.teamPlaceId);
    const { teamPlaceColor } = await req.json();

    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );
    if (index === -1) return res(ctx.status(403));

    teamPlaces[index].teamPlaceColor = teamPlaceColor;

    return res(ctx.status(200));
  }),

  // 팀플레이스 내 정보 수정
  rest.patch(
    '/api/team-places/:teamPlaceId/members/me',
    async (req, res, ctx) => {
      const newUserInfo = await req.json();
      const me = MEMBERS.find((member) => member.isMe);

      if (!me) {
        return res(ctx.status(404));
      }

      Object.assign(me, newUserInfo);

      return res(ctx.status(200));
    },
  ),
];
