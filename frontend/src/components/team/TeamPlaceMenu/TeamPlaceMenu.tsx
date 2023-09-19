import Menu from '~/components/common/Menu/Menu';
import Text from '~/components/common/Text/Text';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { ArrowExpandMoreIcon } from '~/assets/svg';
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
        value={displayValue}
      >
        <Text as="span" weight="bold" css={S.teamPlaceName}>
          {displayValue}
        </Text>
        <ArrowExpandMoreIcon />
      </Menu.Button>
      <Menu.List onSelect={handleSelect}>
        {teamPlaces.map((teamPlace) => (
          <Menu.Item
            key={teamPlace.id}
            value={teamPlace.displayName}
            css={S.teamInfo}
          >
            <TeamBadge size="sm" teamPlaceColor={teamPlace.teamPlaceColor} />

            {teamPlace.displayName}
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
};

export default TeamPlaceMenu;
