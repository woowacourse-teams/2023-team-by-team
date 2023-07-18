import { rest } from 'msw';
import { schedules as scheduleData } from '~/mocks/data/calendarData';

let schedules = [...scheduleData];

export const calendarHandlers = [
  //팀플레이스 일정 기간 조회
  rest.get(`/api/team-place/:teamPlaceId/calendar/schedules`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(schedules));
  }),
  //팀플레이스 특정 일정 조회
  rest.get(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    (req, res, ctx) => {
      const scheduleId = Number(req.params.scheduleId);
      const data = schedules.find((schedule) => schedule.id === scheduleId);
      return res(ctx.status(200), ctx.json(data));
    },
  ),
  //팀플레이스 일정 등록
  rest.post(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    async (req, res, ctx) => {
      const { title, startDateTime, endDateTime } = await req.json();
      const newSchedule = {
        id: schedules.length,
        title,
        startDateTime,
        endDateTime,
      };
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
  //팀플레이스 일정 수정
  rest.patch(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    async (req, res, ctx) => {
      const scheduleId = Number(req.params.scheduleId);
      const { title, startDateTime, endDateTime } = await req.json();

      const index = schedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );
      schedules[index] = {
        id: scheduleId,
        title,
        startDateTime,
        endDateTime,
      };

      return res(ctx.status(200));
    },
  ),
  //팀플레이스 일정 삭제
  rest.delete(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    async (req, res, ctx) => {
      const scheduleId = Number(req.params.scheduleId);
      schedules = schedules.filter((schedule) => schedule.id !== scheduleId);
      schedules = schedules.map((schedule, index) => {
        const { title, startDateTime, endDateTime } = schedule;
        return {
          id: index,
          title,
          startDateTime,
          endDateTime,
        };
      });
      return res(ctx.status(204));
    },
  ),
];
