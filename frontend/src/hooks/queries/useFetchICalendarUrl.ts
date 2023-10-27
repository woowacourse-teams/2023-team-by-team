import { useQuery } from '@tanstack/react-query';
import { fetchICalendarUrl } from '~/apis/schedule';
import { STALE_TIME } from '~/constants/query';

export const useFetchICalendarUrl = (teamPlaceId: number) => {
  const { data } = useQuery(
    ['iCalendarUrl', teamPlaceId],
    () => fetchICalendarUrl(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
      staleTime: STALE_TIME.ICALENDAR_URL,
      meta: {
        errorMessage:
          '일정 내보내기에 실패했습니다. \n지속되는 경우 관리자에게 문의해주세요.',
      },
      placeholderData: { url: 'https://assets.teamby.team/prod/ical/1' },
    },
  );

  return data ?? { url: '' };
};
