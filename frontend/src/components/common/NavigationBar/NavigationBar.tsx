import { CalendarIcon, FeedIcon, HomeIcon, TeamAddIcon } from '~/assets/svg';
import * as S from './NavigationBar.styled';
import { PATH_NAME } from '~/constants/routes';

const NavigationBar = () => {
  return (
    <S.Container>
      <S.MenuContainer>
        <S.MenuLink
          to={PATH_NAME.TEAM_CALENDAR}
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
          to={PATH_NAME.CREATE}
          aria-label="팀 시작 페이지로 이동하기 버튼"
        >
          <TeamAddIcon />
        </S.MenuLink>
      </S.MenuContainer>
    </S.Container>
  );
};

export default NavigationBar;
