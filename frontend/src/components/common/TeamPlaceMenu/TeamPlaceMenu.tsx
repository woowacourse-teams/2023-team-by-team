import Menu from '~/components/common/Menu/Menu';
import * as S from './TeamPlaceMenu.styled';
import MenuButton from '~/components/common/Menu/MenuButton/MenuButton';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { MouseEventHandler } from 'react';
import Text from '~/components/common/Text/Text';

interface TeamPlaceMenuProps {
  displayValue: string;
  onClickMenu: (value: string) => void;
}

const TeamPlaceMenu = (props: TeamPlaceMenuProps) => {
  const { displayValue, onClickMenu } = props;
  const { teamPlaces } = useTeamPlace();

  const handleMenuClick: MouseEventHandler<HTMLUListElement> = (e) => {
    const { target } = e;

    if (!(target instanceof HTMLLIElement)) {
      return;
    }
    onClickMenu(target.textContent ?? '');
  };

  return (
    <Menu>
      <MenuButton css={S.teamPlaceButton}>
        <Text as="span" css={S.teamPlaceName}>
          {displayValue}
        </Text>
      </MenuButton>
      <Menu.List onClick={handleMenuClick}>
        {teamPlaces.map((teamPlace) => (
          <Menu.Item key={teamPlace.id} value={teamPlace.displayName}>
            {teamPlace.displayName}
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
};

export default TeamPlaceMenu;
