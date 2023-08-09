import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, LogoutIcon } from '~/assets/svg';
import * as S from './Header.styled';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import TeamPlaceMenu from '~/components/team/TeamPlaceMenu/TeamPlaceMenu';
import { PATH_NAME } from '~/constants/routes';
import Button from '~/components/common/Button/Button';

const Header = () => {
  const { teamPlaces, changeTeamPlace, teamPlaceColor, displayName } =
    useTeamPlace();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState(displayName ?? '');

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

  useEffect(() => {
    handleTeamNameChange(displayName);
  }, [handleTeamNameChange, displayName]);

  const handleLogoutClick = () => {
    const isLogout = confirm('로그아웃 하시겠습니까?');

    if (!isLogout) return;

    alert('로그아웃 되었습니다.');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('teamPlaceId');

    navigate(PATH_NAME.LANDING);
  };

  return (
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
      <Button variant="normal" css={S.logoutButton} onClick={handleLogoutClick}>
        로그아웃
        <LogoutIcon />
      </Button>
    </S.Container>
  );
};

export default Header;
