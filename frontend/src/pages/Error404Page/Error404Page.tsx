import * as S from './Error404Page.styled';
import { useState, useEffect } from 'react';
import { PATH_NAME } from '~/constants/routes';
import LandingHeader from '~/components/common/LandingHeader/LandingHeader';
import Error404 from '~/components/common/Error404/Error404';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

const Error404Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    setIsLoggedIn(() => isLoggedIn);
  }, []);

  return (
    <S.Container>
      <LandingHeader
        href={isLoggedIn ? PATH_NAME.TEAM_OVERVIEW : PATH_NAME.LANDING}
        ariaLabel={
          isLoggedIn ? '모아보기 페이지로 이동하기' : '랜딩 페이지로 이동하기'
        }
      />
      <S.Error404Wrapper>
        <Error404 isLoggedIn={isLoggedIn} />
      </S.Error404Wrapper>
    </S.Container>
  );
};

export default Error404Page;
