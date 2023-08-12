import { rest } from 'msw';
import type { TeamLink } from '~/types/link';

const teamLinks = [] as TeamLink[];

export const LinkHandlers = [
  // 팀 링크 등록
  rest.post(
    '/api/team-place/:teamPlaceId/team-links',
    async (req, res, ctx) => {
      const { title, url } = await req.json();
      teamLinks.push({
        title,
        url,
      });

      return res(ctx.status(201));
    },
  ),
];
