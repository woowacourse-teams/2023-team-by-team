import { LogoIcon } from '~/assets/svg';
import * as S from './Header.styled';
import Text from '~/components/common/Text/Text';
import TeamBadge from '~/components/common/TeamBadge/TeamBadge';

const Header = () => {
  return (
    <S.Container>
      <LogoIcon />
      <div>
        <TeamBadge teamPlaceColor={0} />
        <Text as="h1" css={S.teamPlaceName}>
          현대사회와 범죄 5조
        </Text>
      </div>
    </S.Container>
  );
};

export default Header;
