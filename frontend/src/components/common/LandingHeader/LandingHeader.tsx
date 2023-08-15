import * as S from './LandingHeader.styled';
import Text from '~/components/common/Text/Text';
import type { PATH_NAME } from '~/constants/routes';
import { LogoIcon } from '~/assets/svg';

interface LandingHeaderProps {
  href: (typeof PATH_NAME)[keyof typeof PATH_NAME];
}

const LandingHeader = (props: LandingHeaderProps) => {
  const { href } = props;

  return (
    <S.Container>
      <S.LandingPageLink to={href}>
        <LogoIcon />
        <Text as="h1" css={S.headerTitle}>
          팀바팀
        </Text>
      </S.LandingPageLink>
    </S.Container>
  );
};

export default LandingHeader;
