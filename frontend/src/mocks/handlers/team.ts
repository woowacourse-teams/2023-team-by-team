import { rest } from 'msw';
import { teamPlaces as teamPlaceData } from '~/mocks/fixtures/team';

const teamPlaces = { ...teamPlaceData };

export const teamHandlers = [
  // 팀플레이스 목록 조회
  rest.get('/api/me/team-places', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamPlaces));
  }),
];
