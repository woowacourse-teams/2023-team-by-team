import * as S from './LandingHeader.styled';
import Text from '~/components/common/Text/Text';
import { PATH_NAME } from '~/constants/routes';
import { LogoIcon } from '~/assets/svg';

const LandingHeader = () => {
  return (
    <S.Container>
      <S.LandingPageLink to={PATH_NAME.LANDING}>
        <LogoIcon />
        <Text as="h1" css={S.headerTitle}>
          팀바팀
        </Text>
      </S.LandingPageLink>
    </S.Container>
  );
};

export default LandingHeader;
