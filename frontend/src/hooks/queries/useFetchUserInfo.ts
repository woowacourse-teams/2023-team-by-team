import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '~/apis/user';
import { STALE_TIME } from '~/constants/query';

export const useFetchUserInfo = () => {
  const { data } = useQuery(['userInfo'], fetchUserInfo, {
    staleTime: STALE_TIME.USER_INFO,
  });

  return { userInfo: data };
};
