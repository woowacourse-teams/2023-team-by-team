import { useQuery } from '@tanstack/react-query';
import { fetchICalendarUrl } from '~/apis/schedule';

export const useFetchICalendarUrl = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['iCalendarUrl', teamPlaceId],
    () => fetchICalendarUrl(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
      meta: {
        errorMessage:
          '일정 내보내기에 실패했습니다. \n지속되는 경우 관리자에게 문의해주세요.',
      },
    },
  );

  return data ?? { url: '' };
};
