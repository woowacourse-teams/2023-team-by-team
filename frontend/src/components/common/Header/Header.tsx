import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, LogoIcon, TeamIcon } from '~/assets/svg';
import * as S from './Header.styled';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import TeamPlaceMenu from '~/components/team/TeamPlaceMenu/TeamPlaceMenu';
import { PATH_NAME } from '~/constants/routes';
import Button from '~/components/common/Button/Button';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import TeamPlaceInfoModal from '~/components/team/TeamPlaceInfoModal/TeamPlaceInfoModal';
import { useModal } from '~/hooks/useModal';
import { useFetchUserInfo } from '~/hooks/queries/useFetchUserInfo';
import UserInfoModal from '~/components/user/UserInfoModal/UserInfoModal';
import NotificationListModal from '~/components/feed/NotificationListModal/NotificationListModal';

const Header = () => {
  const {
    teamPlaces,
    teamPlaceId,
    changeTeamPlace,
    teamPlaceColor,
    displayName,
  } = useTeamPlace();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { userInfo } = useFetchUserInfo();
  const [teamName, setTeamName] = useState(displayName ?? '');
  const [modalOpenType, setModalOpenType] = useState<
    'notification' | 'team' | 'user'
  >();

  const handleTeamNameChange = useCallback(
    (value: string) => {
      if (value === '') {
        setTeamName(() => '');
        return;
      }

      const newTeamPlace = teamPlaces.find(
        (teamPlace) => teamPlace.displayName === value,
      );

      if (newTeamPlace === undefined) {
        return;
      }

      changeTeamPlace(newTeamPlace.id);
      setTeamName(() => value);

      if (location.pathname === PATH_NAME.TEAM_SELECT) {
        navigate(PATH_NAME.TEAM_CALENDAR);
      }
    },
    /*eslint-disable-next-line*/
    [changeTeamPlace, teamPlaces],
  );

  const handleNotificationButtonClick = () => {
    setModalOpenType(() => 'notification');
    openModal();
  };

  const handleTeamButtonClick = () => {
    setModalOpenType(() => 'team');
    openModal();
  };

  const handleUserButtonClick = () => {
    setModalOpenType(() => 'user');
    openModal();
  };

  useEffect(() => {
    const id = localStorage.getItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    if (teamPlaceId !== Number(id)) return;

    handleTeamNameChange(displayName);
  }, [handleTeamNameChange, displayName, teamPlaceId]);

  return (
    <>
      <S.Container tabIndex={0}>
        <S.InnerContainer>
          <Link to={PATH_NAME.TEAM_CALENDAR} aria-label="홈 페이지로 가기 버튼">
            <LogoIcon />
          </Link>
          <div>
            <TeamBadge teamPlaceColor={teamPlaceColor} />
            <S.TeamNameWrapper>
              <TeamPlaceMenu
                displayValue={teamName}
                onClickMenu={handleTeamNameChange}
              />
            </S.TeamNameWrapper>
          </div>
        </S.InnerContainer>

        <S.ButtonContainer>
          <Button
            type="button"
            variant="plain"
            onClick={handleNotificationButtonClick}
            css={S.notificationButton}
            aria-label="알림 목록 보기"
          >
            <BellIcon />
          </Button>

          <Button
            type="button"
            variant="plain"
            onClick={handleTeamButtonClick}
            css={S.teamPlaceInfoButton}
            aria-label="팀 정보 보기"
          >
            <TeamIcon />
          </Button>

          <S.Divider />

          <Button
            type="button"
            variant="plain"
            css={S.userInfoButton}
            onClick={handleUserButtonClick}
            aria-label="프로필 보기"
          >
            <S.ProfileImage src={userInfo?.profileImageUrl} alt="프로필 사진" />
          </Button>
        </S.ButtonContainer>
      </S.Container>

      {modalOpenType === 'notification' && <NotificationListModal />}
      {modalOpenType === 'team' && <TeamPlaceInfoModal />}
      {modalOpenType === 'user' && <UserInfoModal />}
    </>
  );
};

export default Header;
