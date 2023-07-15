import { rest } from 'msw';
import type { Schedule } from '~/types/schedule';

const schedules: Schedule[] = [
  {
    id: 1,
    title: 'test',
    startDateTime: '2023-07-13 00:00',
    endDateTime: '2023-07-14 00:00',
  },
];

export const calendarHandlers = [
  rest.get(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(schedules));
    },
  ),

  rest.post(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    async (req, res, ctx) => {
      const { title, startDateTime, endDateTime } = await req.json();
      const newSchedule = { id: Date.now(), title, startDateTime, endDateTime };
      const teamPlaceId = Number(req.params.teamPlaceId);

      schedules.push(newSchedule);

      return res(
        ctx.status(201),
        ctx.set(
          'Location',
          `/api/team-place/${teamPlaceId}/calendar/schedules/${newSchedule.id}`,
        ),
      );
    },
  ),
];
