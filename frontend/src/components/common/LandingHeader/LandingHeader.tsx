import * as S from './LandingHeader.styled';
import Text from '~/components/common/Text/Text';
import { LogoIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import type { PATH_NAME } from '~/constants/routes';
import { useNavigate } from 'react-router-dom';

interface LandingHeaderProps {
  href: (typeof PATH_NAME)[keyof typeof PATH_NAME];
  ariaLabel?: string;
}

const LandingHeader = (props: LandingHeaderProps) => {
  const { href, ariaLabel } = props;
  const navigate = useNavigate();

  return (
    <S.Container>
      <Button
        type="button"
        variant="plain"
        css={S.landingPageLinkButton}
        onClick={() => navigate(href)}
        aria-label={ariaLabel}
      >
        <LogoIcon />
        <Text as="h1" css={S.headerTitle}>
          팀바팀
        </Text>
      </Button>
    </S.Container>
  );
};

export default LandingHeader;
