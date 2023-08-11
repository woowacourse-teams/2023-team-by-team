import { rest } from 'msw';
import {
  teamPlaces as teamPlacesData,
  inviteTeams,
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
];
