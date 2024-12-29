import { delay, http, HttpResponse } from 'msw';
import {
  schedules as scheduleData,
  mySchedules as myScheduleData,
} from '~/mocks/fixtures/schedules';
import { teamPlaces } from '~/mocks/fixtures/team';
import { generateYYYYMMDDWithoutHyphens } from '~/utils/generateYYYYMMDDWithoutHyphens';
import type { ScheduleWithoutId } from '~/types/schedule';

let schedules = [...scheduleData];
let mySchedules = [...myScheduleData];

export const calendarHandlers = [
  //통합캘린더 일정 기간 조회
  http.get(`/api/my-calendar/schedules`, ({ request }) => {
    const url = new URL(request.url);

    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!startDate || !endDate) {
      return new HttpResponse(null, {
        status: 400,
      });
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

    return HttpResponse.json({
      schedules: searchedMySchedules,
    });
  }),

  //팀플레이스 일정 기간 조회
  http.get(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    ({ request, params }) => {
      const url = new URL(request.url);
      const teamPlaceId = Number(params.teamPlaceId);
      const startDate = url.searchParams.get('startDate');
      const endDate = url.searchParams.get('endDate');

      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (index === -1) return new HttpResponse(null, { status: 403 });

      if (!startDate || !endDate)
        return new HttpResponse(null, { status: 400 });

      const searchedSchedules = schedules.filter(
        ({ startDateTime, endDateTime }) => {
          const isScheduleInRange =
            startDate <=
              generateYYYYMMDDWithoutHyphens(new Date(startDateTime)) ||
            endDate >= generateYYYYMMDDWithoutHyphens(new Date(endDateTime));

          return isScheduleInRange;
        },
      );

      return HttpResponse.json({ schedules: searchedSchedules });
    },
  ),

  //팀플레이스 특정 일정 조회
  http.get(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    ({ params }) => {
      const scheduleId = Number(params.scheduleId);
      const data = schedules.find((schedule) => schedule.id === scheduleId);

      console.log('테스트', { scheduleId, data });

      const teamPlaceId = Number(params.teamPlaceId);
      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (index === -1) return new HttpResponse(null, { status: 403 });

      if (data === undefined) return new HttpResponse(null, { status: 404 });

      return HttpResponse.json(data);
    },
  ),

  //팀플레이스 일정 등록
  http.post<{ teamPlaceId: string }, ScheduleWithoutId>(
    `/api/team-place/:teamPlaceId/calendar/schedules`,
    async ({ request, params }) => {
      const { title, startDateTime, endDateTime } = await request.json();
      const newSchedule = {
        id: Date.now(),
        title,
        startDateTime,
        endDateTime,
      };
      const teamPlaceId = Number(params.teamPlaceId);
      const index = teamPlaces.findIndex(
        (teamPlace) => teamPlace.id === teamPlaceId,
      );

      if (index === -1) return new HttpResponse(null, { status: 403 });
      if (title.length > 250) return new HttpResponse(null, { status: 500 });

      schedules.push(newSchedule);
      mySchedules.push({ ...newSchedule, teamPlaceId: 1 });

      return new HttpResponse(null, {
        status: 201,
        headers: {
          Location: `/api/team-place/${teamPlaceId}/calendar/schedules/${newSchedule.id}`,
        },
      });
    },
  ),

  //팀플레이스 일정 수정
  http.patch<{ teamPlaceId: string; scheduleId: string }, ScheduleWithoutId>(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    async ({ request, params }) => {
      const teamPlaceId = Number(params.teamPlaceId);
      const scheduleId = Number(params.scheduleId);

      const { title, startDateTime, endDateTime } = await request.json();
      console.log('테스트', title, startDateTime, endDateTime);
      const index = schedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );

      const myIndex = mySchedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );

      if (index === -1) return new HttpResponse(null, { status: 404 });

      if (title.length > 250) new HttpResponse(null, { status: 500 });

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

      return new HttpResponse(null);
    },
  ),

  //팀플레이스 일정 삭제
  http.delete(
    `/api/team-place/:teamPlaceId/calendar/schedules/:scheduleId`,
    async ({ params }) => {
      const scheduleId = Number(params.scheduleId);
      const index = schedules.findIndex(
        (schedule) => schedule.id === scheduleId,
      );
      if (index === -1) return new HttpResponse(null, { status: 404 });

      schedules = schedules.filter((schedule) => schedule.id !== scheduleId);
      mySchedules = mySchedules.filter(
        (schedule) => schedule.id !== scheduleId,
      );

      return new HttpResponse(null, { status: 204 });
    },
  ),

  //팀플레이스 iCalendar URL 조회
  http.get(`/api/team-place/:teamPlaceId/icalendar-url`, async ({ params }) => {
    const teamPlaceId = Number(params.teamPlaceId);
    const index = teamPlaces.findIndex(
      (teamPlace) => teamPlace.id === teamPlaceId,
    );

    if (index === -1) return new HttpResponse(null, { status: 403 });

    await delay(1000);

    return HttpResponse.json({
      url: 'https://assets.teamby.team/prod/ical/1-5',
    });
  }),
];
