import { rest } from 'msw';
import { teamLinks } from '../fixtures/link';
import { teamPlaces } from '~/mocks/fixtures/team';

let incrementalId = 1;

const getIncrementalId = () => {
  return incrementalId++;
};

export const LinkHandlers = [
  // 팀 링크 등록
  rest.post(
    '/api/team-place/:teamPlaceId/team-links',
    async (req, res, ctx) => {
      const { title, url } = await req.json();
      teamLinks.push({
        id: getIncrementalId(),
        memberId: 123123,
        memberName: '루루',
        updatedAt: '2023-08-12 15:02',
        title,
        url,
      });

      return res(ctx.status(201));
    },
  ),

  // 팀 링크목록 조회
  rest.get('/api/team-place/:teamPlaceId/team-links', async (req, res, ctx) => {
    const teamPlaceId = Number(req.params.teamPlaceId);
    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );

    if (index === -1) return res(ctx.status(403));

    return res(ctx.status(200), ctx.json({ teamLinks }));
  }),

  // 팀 링크 삭제
  rest.delete(
    '/api/team-place/:teamPlaceId/team-links/:teamLinkId',
    async (req, res, ctx) => {
      const teamLinkId = Number(req.params.teamLinkId);
      const deleteIndex = teamLinks.findIndex(({ id }) => id === teamLinkId);

      if (deleteIndex === -1) {
        return res(ctx.status(404));
      }

      teamLinks.splice(deleteIndex, 1);

      return res(ctx.status(204));
    },
  ),
];
