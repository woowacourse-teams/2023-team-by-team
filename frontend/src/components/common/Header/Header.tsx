import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditIcon, LogoIcon, TeamIcon } from '~/assets/svg';
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
import TeamColorEditModal from '~/components/team/TeamColorEditModal/TeamColorEditModal';
import AccountDeleteModal from '~/components/user/AccountDeleteModal/AccountDeleteModal';
import ServiceCenterModal from '~/components/user/ServiceCenterModal/ServiceCenterModal';
import { getIsMobile } from '~/utils/getIsMobile';

export type HeaderModalType =
  | 'team'
  | 'user'
  | 'teamColor'
  | 'accountDelete'
  | 'serviceCenter';

const Header = () => {
  const {
    teamPlaces,
    teamPlaceId,
    changeTeamPlace,
    teamPlaceColor,
    displayName,
  } = useTeamPlace();
  const navigate = useNavigate();
  const { openModal, isModalOpen } = useModal();
  const isMobile = getIsMobile();
  const { userInfo } = useFetchUserInfo();

  const [teamName, setTeamName] = useState(displayName ?? '');
  const [modalOpenType, setModalOpenType] = useState<HeaderModalType>();

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
        isMobile
          ? navigate(PATH_NAME.TEAM_SELECT)
          : navigate(PATH_NAME.TEAM_OVERVIEW);
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

  const handleTeamColorButtonClick = () => {
    setModalOpenType(() => 'teamColor');
    openModal();
  };

  const handleAccountDeleteButtonClick = () => {
    setModalOpenType(() => 'accountDelete');
    openModal();
  };

  const handleServiceCenterButtonClick = () => {
    setModalOpenType(() => 'serviceCenter');
    openModal();
  };

  useEffect(() => {
    const id = localStorage.getItem(LOCAL_STORAGE_KEY.TEAM_PLACE_ID);

    if (teamPlaceId !== Number(id)) return;

    handleTeamNameChange(displayName);
  }, [handleTeamNameChange, displayName, teamPlaceId]);

  return (
    <>
      <S.Header tabIndex={0} $isMobile={isMobile}>
        <S.InnerContainer>
          {!isMobile && (
            <Link
              to={PATH_NAME.TEAM_OVERVIEW}
              aria-label="모아보기 페이지로 가기"
            >
              <LogoIcon />
            </Link>
          )}
          <div>
            <Button
              type="button"
              variant="plain"
              onClick={handleTeamColorButtonClick}
              css={S.teamColorButton(modalOpenType, isModalOpen)}
              aria-label="팀 색상 변경하기"
            >
              <TeamBadge size="lg" teamPlaceColor={teamPlaceColor} />
              <S.TeamBadgeEditIconWrapper>
                <EditIcon />
              </S.TeamBadgeEditIconWrapper>
            </Button>
            <S.TeamNameWrapper>
              <TeamPlaceMenu
                displayValue={teamName}
                onSelect={handleTeamNameChange}
              />
            </S.TeamNameWrapper>
          </div>
        </S.InnerContainer>

        <S.ButtonContainer>
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
      </S.Header>

      {modalOpenType === 'team' && <TeamPlaceInfoModal />}
      {modalOpenType === 'user' && (
        <UserInfoModal
          onServiceCenterButtonClick={handleServiceCenterButtonClick}
        />
      )}
      {modalOpenType === 'serviceCenter' && (
        <ServiceCenterModal
          onAccountDeleteButtonClick={handleAccountDeleteButtonClick}
        />
      )}
      {modalOpenType === 'teamColor' && <TeamColorEditModal />}
      {modalOpenType === 'accountDelete' && <AccountDeleteModal />}
    </>
  );
};

export default Header;
