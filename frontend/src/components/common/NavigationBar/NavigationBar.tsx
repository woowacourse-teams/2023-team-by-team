import { CalendarIcon, FeedIcon, HomeIcon } from '~/assets/svg';
import * as S from './NavigationBar.styled';

const NavigationBar = () => {
  return (
    <S.Container>
      <S.MenuContainer>
        <S.MenuLink to="/" aria-label="홈 페이지로 이동하기 버튼">
          <HomeIcon />
        </S.MenuLink>
        <S.MenuLink to="/" aria-label="팀 캘린더 페이지로 이동하기 버튼">
          <CalendarIcon />
        </S.MenuLink>
        <S.MenuLink to="/threads" aria-label="팀 피드 페이지로 이동하기 버튼">
          <FeedIcon />
        </S.MenuLink>
      </S.MenuContainer>
    </S.Container>
  );
};

export default NavigationBar;
