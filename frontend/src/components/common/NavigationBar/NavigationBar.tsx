import { CalendarIcon, FeedIcon, HomeIcon } from '~/assets/svg';
import * as S from './NavigationBar.styled';
import Button from '~/components/common/Button/Button';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <S.Container>
      <S.MenuContainer>
        <Link to="/">
          <Button type="button" variant="plain" css={S.menuIcon}>
            <HomeIcon />
          </Button>
        </Link>
        <Link to="/">
          <Button type="button" variant="plain" css={S.menuIcon}>
            <CalendarIcon />
          </Button>
        </Link>
        <Link to="/threads">
          <Button type="button" variant="plain" css={S.menuIcon}>
            <FeedIcon />
          </Button>
        </Link>
      </S.MenuContainer>
    </S.Container>
  );
};

export default NavigationBar;
