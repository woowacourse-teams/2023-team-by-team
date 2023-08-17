import { PATH_NAME } from '~/constants/routes';
import {
  CalendarIcon,
  FeedIcon,
  ChainIcon,
  TeamAddIcon,
  HomeIcon,
} from '~/assets/svg';
import * as S from './NavigationBar.styled';
import Text from '~/components/common/Text/Text';

const NavigationBar = () => {
  return (
    <S.Nav>
      <S.MenuContainer>
        <S.MenuLink to={PATH_NAME.TEAM_OVERVIEW}>
          <HomeIcon />
          <Text as="span">모아보기</Text>
        </S.MenuLink>
        <S.MenuLink to={PATH_NAME.TEAM_CALENDAR}>
          <CalendarIcon />
          <Text as="span">캘린더</Text>
        </S.MenuLink>
        <S.MenuLink to={PATH_NAME.TEAM_FEED}>
          <FeedIcon />
          <Text as="span">피드</Text>
        </S.MenuLink>
        <S.MenuLink to={PATH_NAME.TEAM_LINK}>
          <ChainIcon />
          <Text as="span">링크</Text>
        </S.MenuLink>
        <S.MenuLink to={PATH_NAME.START}>
          <TeamAddIcon />
          <Text as="span">팀 참가/개설</Text>
        </S.MenuLink>
      </S.MenuContainer>
    </S.Nav>
  );
};

export default NavigationBar;
