import * as S from './BackButton.styled';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft2Icon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import type { PATH_NAME } from '~/constants/routes';

interface BackButtonProps {
  label: string;
  href?: (typeof PATH_NAME)[keyof typeof PATH_NAME];
}

const BackButton = (props: BackButtonProps) => {
  const { label, href } = props;
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="plain"
      css={S.backButton}
      onClick={() => {
        href ? navigate(href) : navigate(-1);
      }}
    >
      <S.ArrowLeftIconWrapper>
        <ArrowLeft2Icon />
      </S.ArrowLeftIconWrapper>
      <Text weight="semiBold">{label}</Text>
    </Button>
  );
};

export default BackButton;
