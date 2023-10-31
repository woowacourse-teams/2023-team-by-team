import { useLocation, useNavigate } from 'react-router-dom';
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
import Button from '~/components/common/Button/Button';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useCheckMobileWeb();
  const handleTeamAddButtonClick = () => {
    navigate(PATH_NAME.START, { state: { from: location } });
  };

  return (
    <S.Nav $isMobile={isMobile}>
      <S.MenuContainer $isMobile={isMobile}>
        {!isMobile && (
          <S.MenuLink to={PATH_NAME.TEAM_OVERVIEW}>
            <HomeIcon />
            <Text as="span">모아보기</Text>
          </S.MenuLink>
        )}

        <S.MenuLink to={PATH_NAME.TEAM_CALENDAR}>
          <CalendarIcon />
          {!isMobile && <Text as="span">캘린더</Text>}
        </S.MenuLink>
        <S.MenuLink to={PATH_NAME.TEAM_FEED}>
          <FeedIcon />
          {!isMobile && <Text as="span">피드</Text>}
        </S.MenuLink>
        <S.MenuLink to={PATH_NAME.TEAM_LINK}>
          <ChainIcon />
          {!isMobile && <Text as="span">링크</Text>}
        </S.MenuLink>
        <Button
          type="button"
          variant="plain"
          css={S.teamAddButton}
          onClick={handleTeamAddButtonClick}
        >
          <TeamAddIcon />
          {!isMobile && (
            <Text as="span" css={S.teamAddText}>
              팀 참가/개설
            </Text>
          )}
        </Button>
      </S.MenuContainer>
    </S.Nav>
  );
};

export default NavigationBar;
