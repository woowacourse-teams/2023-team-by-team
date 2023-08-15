import { PATH_NAME } from '~/constants/routes';
import {
  CalendarIcon,
  FeedIcon,
  HomeIcon,
  ChainIcon,
  TeamAddIcon,
} from '~/assets/svg';
import * as S from './NavigationBar.styled';

const NavigationBar = () => {
  return (
    <>
      <S.Container>
        <S.MenuContainer>
          <S.MenuLink
            to={PATH_NAME.TEAM_OVERVIEW}
            aria-label="모아보기 페이지로 이동하기 버튼"
          >
            <HomeIcon />
          </S.MenuLink>
          <S.MenuLink
            to={PATH_NAME.TEAM_CALENDAR}
            aria-label="팀 캘린더 페이지로 이동하기 버튼"
          >
            <CalendarIcon />
          </S.MenuLink>
          <S.MenuLink
            to={PATH_NAME.TEAM_FEED}
            aria-label="팀 피드 페이지로 이동하기 버튼"
          >
            <FeedIcon />
          </S.MenuLink>
          <S.MenuLink
            to={PATH_NAME.TEAM_LINK}
            aria-label="팀 링크 페이지로 이동하기 버튼"
          >
            <ChainIcon />
          </S.MenuLink>
          <S.MenuLink
            to={PATH_NAME.START}
            aria-label="팀 시작 페이지로 이동하기 버튼"
          >
            <TeamAddIcon />
          </S.MenuLink>
        </S.MenuContainer>
      </S.Container>
    </>
  );
};

export default NavigationBar;
