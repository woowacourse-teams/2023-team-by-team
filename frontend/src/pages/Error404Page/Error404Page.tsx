import * as S from './Error404Page.styled';
import { useState, useEffect } from 'react';
import { PATH_NAME } from '~/constants/routes';
import LandingHeader from '~/components/common/LandingHeader/LandingHeader';
import Error404 from '~/components/common/Error404/Error404';
import { useToken } from '~/hooks/useToken';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';

const Error404Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { accessToken } = useToken();
  const isMobile = useCheckMobileWeb();

  useEffect(() => {
    const isLoggedIn = Boolean(accessToken);

    setIsLoggedIn(() => isLoggedIn);
  }, []);

  return (
    <S.Container>
      <LandingHeader
        href={
          isLoggedIn
            ? isMobile
              ? PATH_NAME.TEAM_CALENDAR
              : PATH_NAME.TEAM_OVERVIEW
            : PATH_NAME.LANDING
        }
      />
      <S.Error404Wrapper>
        <Error404 isLoggedIn={isLoggedIn} />
      </S.Error404Wrapper>
    </S.Container>
  );
};

export default Error404Page;
