import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PATH_NAME } from '~/constants/routes';
import { useFetchTeamPlaces } from '~/hooks/queries/useFetchTeamPlaces';
import { KEY } from '~/constants/localStorage';

const LoginPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const accessToken = params.get('accessToken');
  localStorage.setItem(KEY.ACCESS_TOKEN, accessToken ?? '');
  const { teamPlaces, isFetched } = useFetchTeamPlaces();

  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      localStorage.removeItem(KEY.ACCESS_TOKEN);
      navigate(PATH_NAME.LANDING);

      return;
    }
  }, []);

  useEffect(() => {
    if (isFetched) {
      teamPlaces.length === 0
        ? navigate(PATH_NAME.START)
        : navigate(PATH_NAME.TEAM_SELECT);
    }
  }, [isFetched]);
  return <></>;
};

export default LoginPage;
