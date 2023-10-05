import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchICalendarUrl } from '~/apis/schedule';
import { useToast } from '~/hooks/useToast';

export const useFetchICalendarUrl = (teamPlaceId: number) => {
  const { data, error } = useQuery(
    ['iCalendarUrl', teamPlaceId],
    () => fetchICalendarUrl(teamPlaceId),
    {
      enabled: teamPlaceId > 0,
    },
  );
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(
        'error',
        '잠시 후 다시 시도해 주세요. 지속적으로 확인할 수 없는 경우 관리자에게 문의해 주세요.',
      );
    }
  }, [error]);

  return data ?? { url: '' };
};
