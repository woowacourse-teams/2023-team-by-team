import { http, HttpResponse } from 'msw';
import { teamLinks } from '../fixtures/link';
import { teamPlaces } from '~/mocks/fixtures/team';
import type { TeamLinkWithoutInfo } from '~/types/link';

let incrementalId = 1;

const getIncrementalId = () => {
  return incrementalId++;
};

export const LinkHandlers = [
  // 팀 링크 등록
  http.post<never, TeamLinkWithoutInfo>(
    '/api/team-place/:teamPlaceId/team-links',
    async ({ request }) => {
      const { title, url } = await request.json();
      teamLinks.push({
        id: getIncrementalId(),
        memberId: 123123,
        memberName: '루루',
        updatedAt: '2023-08-12 15:02',
        title,
        url,
      });

      return new HttpResponse(null, { status: 201 });
    },
  ),

  // 팀 링크목록 조회
  http.get('/api/team-place/:teamPlaceId/team-links', async ({ params }) => {
    const teamPlaceId = Number(params.teamPlaceId);
    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );

    if (index === -1) return new HttpResponse(null, { status: 403 });

    if (teamPlaceId === 2) return HttpResponse.json({ teamLinks: [] });

    return HttpResponse.json({ teamLinks });
  }),

  // 팀 링크 삭제
  http.delete(
    '/api/team-place/:teamPlaceId/team-links/:teamLinkId',
    async ({ params }) => {
      const teamLinkId = Number(params.teamLinkId);
      const deleteIndex = teamLinks.findIndex(({ id }) => id === teamLinkId);

      if (deleteIndex === -1) {
        return new HttpResponse(null, { status: 404 });
      }

      teamLinks.splice(deleteIndex, 1);

      return new HttpResponse(null, { status: 204 });
    },
  ),
];
