import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon } from '~/assets/svg';
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
  const [modalOpenType, setModalOpenType] = useState<'team' | 'user'>();

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

      if (location.pathname !== PATH_NAME.TEAM_FEED) {
        navigate(PATH_NAME.TEAM_CALENDAR);
      }
    },
    /*eslint-disable-next-line*/
    [changeTeamPlace, teamPlaces],
  );

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
            variant="plain"
            onClick={handleTeamButtonClick}
            css={S.teamPlaceInfoButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 20 20"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
                <path d="M3.854 8.896a.5.5 0 0 1 0 .708l-.338.337A3.47 3.47 0 0 0 2.5 12.394v1.856a.5.5 0 1 1-1 0v-1.856a4.47 4.47 0 0 1 1.309-3.16l.337-.338a.5.5 0 0 1 .708 0Zm11.792-.3a.5.5 0 0 0 0 .708l.338.337A3.469 3.469 0 0 1 17 12.094v2.156a.5.5 0 0 0 1 0v-2.156a4.47 4.47 0 0 0-1.309-3.16l-.337-.338a.5.5 0 0 0-.708 0Z" />
                <path d="M14 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 1a3 3 0 1 1 0-6a3 3 0 0 1 0 6Zm-4.5 3.25a2.5 2.5 0 0 0-2.5 2.5v1.3a.5.5 0 0 1-1 0v-1.3a3.5 3.5 0 0 1 7 0v1.3a.5.5 0 1 1-1 0v-1.3a2.5 2.5 0 0 0-2.5-2.5Z" />
                <path d="M9.5 11.75a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
              </g>
            </svg>
          </Button>

          <S.Divider />

          <Button
            type="button"
            variant="plain"
            css={S.userInfoButton}
            onClick={handleUserButtonClick}
          >
            <S.ProfileImage src={userInfo?.profileImageUrl} alt="프로필 사진" />
          </Button>
        </S.ButtonContainer>
      </S.Container>

      {modalOpenType === 'team' && <TeamPlaceInfoModal />}
      {modalOpenType === 'user' && <UserInfoModal />}
    </>
  );
};

export default Header;
