import { rest } from 'msw';
import { teamPlaces as teamPlacesData } from '~/mocks/fixtures/team';

const teamPlaces = [...teamPlacesData];
export const teamHandlers = [
  // 팀플레이스 목록 조회
  rest.get('/api/me/team-places', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ teamPlaces }));
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
];
