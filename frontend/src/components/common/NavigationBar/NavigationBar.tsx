import { CalendarIcon, FeedIcon, HomeIcon } from '~/assets/svg';
import * as S from './NavigationBar.styled';
import Button from '~/components/common/Button/Button';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <S.Container>
      <S.MenuContainer>
        <Link to="/" aria-label="홈 페이지로 이동하기 버튼">
          <HomeIcon />
        </Link>
        <Link to="/" aria-label="팀 캘린더 페이지로 이동하기 버튼">
          <CalendarIcon />
        </Link>
        <Link to="/threads" aria-label="팀 피드 페이지로 이동하기 버튼">
          <FeedIcon />
        </Link>
      </S.MenuContainer>
    </S.Container>
  );
};

export default NavigationBar;
