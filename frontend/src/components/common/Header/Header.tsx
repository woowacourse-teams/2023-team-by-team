import { LogoIcon } from '~/assets/svg';
import * as S from './Header.styled';
import TeamBadge from '~/components/common/TeamBadge/TeamBadge';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import TeamPlaceMenu from '~/components/common/TeamPlaceMenu/TeamPlaceMenu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { teamPlaces, changeTeamPlace, teamPlaceColor, displayName } =
    useTeamPlace();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState(
    displayName === '' ? '팀 선택하기' : displayName,
  );

  const handleTeamNameChange = (value: string) => {
    const newTeamPlace = teamPlaces.find(
      (teamPlace) => teamPlace.displayName === value,
    );
    if (newTeamPlace === undefined) return;
    changeTeamPlace(newTeamPlace.id);
    setTeamName(() => value);
    navigate(`/team-calendar`);
  };

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
