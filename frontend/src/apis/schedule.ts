import { http } from '~/apis/http';
import type { Schedule } from '~/types/schedule';

// export const fetchSchedules = async (
//   teamPlaceId: number,
//   year: number,
//   month: number,
// ) => {
//   const response = await fetch(
//     `/api/team-place/${teamPlaceId}/calendar/schedules?year=${year}&month=${month}`,
//   );

//   if (response.status !== 200) {
//     throw new Error('Babo!');
//   }

//   const data = await response.json();
//   return data;
// };

export const fetchSchedules = (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  return http.get<Schedule[]>(
    `/api/team-place/${teamPlaceId}/calendar/schedules?year=${year}&month=${month}`,
  );
};

// export const sendSchedules = () => {
//   return http.post(`/schedules`, {});
// };
