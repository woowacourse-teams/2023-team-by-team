import { rest } from 'msw';
import {
  schedules as scheduleData,
  mySchedules as myScheduleData,
} from '~/mocks/fixtures/schedules';
import { teamPlaces } from '~/mocks/fixtures/team';
import { generateYYYYMMDDWithoutHyphens } from '~/utils/generateYYYYMMDDWithoutHyphens';

let schedules = [...scheduleData];
let mySchedules = [...myScheduleData];

export const calendarHandlers = [
  //통합캘린더 일정 기간 조회
  rest.get(`/api/my-calendar/schedules`, (req, res, ctx) => {
    const startDate = req.url.searchParams.get('startDate');
    const endDate = req.url.searchParams.get('endDate');

    if (!startDate || !endDate) {
      return res(ctx.status(400));
    }

    const searchedMySchedules = mySchedules.filter(
      ({ startDateTime, endDateTime }) => {
        const isScheduleInRange =
          startDate <=
            generateYYYYMMDDWithoutHyphens(new Date(startDateTime)) ||
          endDate >= generateYYYYMMDDWithoutHyphens(new Date(endDateTime));

        return isScheduleInRange;
      },
    );

    return res(
      ctx.status(200),
      ctx.json({
        schedules: searchedMySchedules,
      }),
    );
  }),

  //팀플레이스 일정 기간 조회
  rest.get(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    (req, res, ctx) => {
      const teamPlaceId = Number(req.params.teamPlaceId);
      const startDate = req.url.searchParams.get('startDate');
      const endDate = req.url.searchParams.get('endDate');

      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (index === -1) return res(ctx.status(403));

      if (!startDate || !endDate) {
        return res(ctx.status(400));
      }

      const searchedSchedules = schedules.filter(
        ({ startDateTime, endDateTime }) => {
          const isScheduleInRange =
            startDate <=
              generateYYYYMMDDWithoutHyphens(new Date(startDateTime)) ||
            endDate >= generateYYYYMMDDWithoutHyphens(new Date(endDateTime));

          return isScheduleInRange;
        },
      );

      return res(
        ctx.status(200),
        ctx.json({
          schedules: searchedSchedules,
        }),
      );
    },
  ),

  //팀플레이스 특정 일정 조회
  rest.get(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    (req, res, ctx) => {
      const scheduleId = Number(req.params.scheduleId);
      const data = schedules.find((schedule) => schedule.id === scheduleId);

      const teamPlaceId = Number(req.params.teamPlaceId);
      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (index === -1) return res(ctx.status(403));

      if (data === undefined) return res(ctx.status(404));
      return res(ctx.status(200), ctx.json(data));
    },
  ),

  //팀플레이스 일정 등록
  rest.post(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    async (req, res, ctx) => {
      const { title, startDateTime, endDateTime } = await req.json();
      const newSchedule = {
        id: Date.now(),
        title,
        startDateTime,
        endDateTime,
      };
      const teamPlaceId = Number(req.params.teamPlaceId);
      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (index === -1) return res(ctx.status(403));
      if (title.length > 250) return res(ctx.status(500));

      schedules.push(newSchedule);
      mySchedules.push({ ...newSchedule, teamPlaceId: 1 });

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
      const teamPlaceId = Number(req.params.teamPlaceId);
      const scheduleId = Number(req.params.scheduleId);

      const { title, startDateTime, endDateTime } = await req.json();
      const index = schedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );

      const myIndex = mySchedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );

      if (index === -1) return res(ctx.status(404));
      if (title.length > 250) return res(ctx.status(500));

      schedules[index] = {
        id: scheduleId,
        title,
        startDateTime,
        endDateTime,
      };

      mySchedules[myIndex] = {
        id: scheduleId,
        teamPlaceId,
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
      const index = schedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );
      if (index === -1) return res(ctx.status(404));

      schedules = schedules.filter((schedule) => schedule.id !== scheduleId);
      mySchedules = mySchedules.filter(
        (schedule) => schedule.id !== scheduleId,
      );
      return res(ctx.status(204));
    },
  ),

  //팀플레이스 iCalendar URL 조회
  rest.get(`/api/team-place/:teamPlaceId/icalendar-url`, (req, res, ctx) => {
    const teamPlaceId = Number(req.params.teamPlaceId);
    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );

    if (index === -1) return res(ctx.status(403));

    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://assets.teamby.team/prod/ical/1-5',
      }),
      ctx.delay(1000),
    );
  }),
];
