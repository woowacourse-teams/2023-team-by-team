import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '~/apis/user';

export const useFetchUserInfo = () => {
  const { data } = useQuery(['userInfo'], fetchUserInfo);

  return { userInfo: data };
};
