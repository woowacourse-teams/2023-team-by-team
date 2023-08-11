import Button from '~/components/common/Button/Button';
import TeamExitModal from '~/components/team/TeamExitModal/TeamExitModal';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useModal } from '~/hooks/useModal';
import { PATH_NAME } from '~/constants/routes';
import {
  CalendarIcon,
  ExitIcon,
  FeedIcon,
  HomeIcon,
  TeamAddIcon,
} from '~/assets/svg';
import * as S from './NavigationBar.styled';

const NavigationBar = () => {
  const { displayName } = useTeamPlace();
  const { openModal } = useModal();

  const handleExitButtonClick = () => {
    openModal();
  };

  return (
    <>
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
            to={PATH_NAME.START}
            aria-label="팀 시작 페이지로 이동하기 버튼"
          >
            <TeamAddIcon />
          </S.MenuLink>
          <Button
            type="button"
            variant="plain"
            disabled={displayName === ''}
            css={S.exitButton}
            aria-label="팀 플레이스 탈퇴하기"
            onClick={handleExitButtonClick}
          >
            <ExitIcon />
          </Button>
        </S.MenuContainer>
      </S.Container>
      <TeamExitModal />
    </>
  );
};

export default NavigationBar;
