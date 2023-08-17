import * as S from './LandingHeader.styled';
import Text from '~/components/common/Text/Text';
import { LogoIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import type { PATH_NAME } from '~/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTeamPlace } from '~/hooks/useTeamPlace';

interface LandingHeaderProps {
  href: (typeof PATH_NAME)[keyof typeof PATH_NAME];
}

const LandingHeader = (props: LandingHeaderProps) => {
  const { href } = props;
  const navigate = useNavigate();
  const { teamPlaces } = useTeamPlace();

  const handleLinkButtonClick = () => {
    if (teamPlaces.length === 0) {
      return;
    }

    navigate(href);
  };

  return (
    <S.Container>
      <Button
        type="button"
        variant="plain"
        css={S.landingPageLinkButton}
        onClick={handleLinkButtonClick}
        aria-label="모아보기 페이지로 이동하기"
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
