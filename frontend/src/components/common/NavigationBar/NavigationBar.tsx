import { CalendarIcon, FeedIcon, HomeIcon } from '~/assets/svg';
import * as S from './NavigationBar.styled';
import Button from '~/components/common/Button/Button';

const NavigationBar = () => {
  return (
    <S.Container>
      <S.MenuContainer>
        <Button type="button" variant="plain" css={S.menuIcon}>
          <HomeIcon />
        </Button>
        <Button type="button" variant="plain" css={S.menuIcon}>
          <FeedIcon />
        </Button>
        <Button type="button" variant="plain" css={S.menuIcon}>
          <CalendarIcon />
        </Button>
      </S.MenuContainer>
    </S.Container>
  );
};

export default NavigationBar;
