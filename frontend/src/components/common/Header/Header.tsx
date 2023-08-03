import { LogoIcon } from '~/assets/svg';
import * as S from './Header.styled';
import Text from '~/components/common/Text/Text';
import TeamBadge from '~/components/common/TeamBadge/TeamBadge';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { getInfoByTeamPlaceId } from '~/utils/getInfoByTeamPlaceId';

const Header = () => {
  const { teamPlaces } = useTeamPlace();

  const { teamPlaceColor, displayName } = getInfoByTeamPlaceId(teamPlaces, 1);

  return (
    <S.Container tabIndex={0}>
      <LogoIcon />
      <div>
        <TeamBadge teamPlaceColor={teamPlaceColor} />
        <Text as="h1" css={S.teamPlaceName}>
          {displayName}
        </Text>
      </div>
    </S.Container>
  );
};

export default Header;
