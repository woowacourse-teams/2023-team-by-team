export const fetchSchedules = async (
  teamPlaceId: number,
  year: number,
  month: number,
) => {
  const response = await fetch(
    `/api/team-place/${teamPlaceId}/calendar/schedules?year=${year}&month=${month}`,
  );

  if (response.status !== 200) {
    throw new Error('Babo!');
  }

  const data = await response.json();
  return data;
};
