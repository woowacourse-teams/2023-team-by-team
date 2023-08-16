import * as S from './BackButton.styled';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft2Icon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';

interface BackButtonProps {
  label: string;
}

const BackButton = (props: BackButtonProps) => {
  const { label } = props;
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="plain"
      css={S.backButton}
      onClick={() => navigate(-1)}
    >
      <S.ArrowLeftIconWrapper>
        <ArrowLeft2Icon />
      </S.ArrowLeftIconWrapper>
      <Text weight="semiBold">{label}</Text>
    </Button>
  );
};

export default BackButton;
