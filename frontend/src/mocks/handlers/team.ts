import { rest } from 'msw';
import { teamPlaces } from '~/mocks/fixtures/team';

export const teamHandlers = [
  // 팀플레이스 목록 조회
  rest.get('/api/me/team-places', async (req, res, ctx) => {
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
];
