import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '~/assets/svg';
import * as S from './Header.styled';
import TeamBadge from '~/components/common/TeamBadge/TeamBadge';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import TeamPlaceMenu from '~/components/common/TeamPlaceMenu/TeamPlaceMenu';
import { PATH_NAME } from '~/constants/routes';

const Header = () => {
  const { teamPlaces, changeTeamPlace, teamPlaceColor, displayName } =
    useTeamPlace();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState(displayName ?? '');

  const handleTeamNameChange = useCallback(
    (value: string) => {
      const newTeamPlace = teamPlaces.find(
        (teamPlace) => teamPlace.displayName === value,
      );

      if (newTeamPlace === undefined) {
        return;
      }

      changeTeamPlace(newTeamPlace.id);
      setTeamName(() => value);
      navigate(PATH_NAME.TEAM_CALENDAR);
    },
    /*eslint-disable-next-line*/
    [changeTeamPlace, teamPlaces],
  );

  useEffect(() => {
    handleTeamNameChange(displayName);
  }, [handleTeamNameChange, displayName]);

  return (
    <S.Container tabIndex={0}>
      <LogoIcon />
      <div>
        <TeamBadge teamPlaceColor={teamPlaceColor} />
        <S.TeamNameWrapper>
          <TeamPlaceMenu
            displayValue={teamName}
            onClickMenu={handleTeamNameChange}
          />
        </S.TeamNameWrapper>
      </div>
    </S.Container>
  );
};

export default Header;
