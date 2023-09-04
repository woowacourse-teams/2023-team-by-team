import Menu from '~/components/common/Menu/Menu';
import Text from '~/components/common/Text/Text';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import * as S from './TeamPlaceMenu.styled';

interface TeamPlaceMenuProps {
  displayValue: string;
  onSelect: (value: string) => void;
}

const TeamPlaceMenu = (props: TeamPlaceMenuProps) => {
  const { displayValue, onSelect } = props;
  const { teamPlaces } = useTeamPlace();

  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <Menu>
      <Menu.Button
        type="button"
        css={S.teamPlaceButton}
        aria-label="목록에서 팀 선택하기"
        title={displayValue}
      >
        <Text as="span" css={S.teamPlaceName}>
          {displayValue}
        </Text>
      </Menu.Button>
      <Menu.List onSelect={handleSelect}>
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
