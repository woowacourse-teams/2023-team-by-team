import { PlusIcon } from '~/assets/svg';
import * as S from './ImageAddButton.styled';
import Button from '~/components/common/Button/Button';

interface ImageAddButtonProps {
  onClick: () => void;
}

const ImageAddButton = (props: ImageAddButtonProps) => {
  const { onClick } = props;

  return (
    <Button
      variant="plain"
      type="button"
      css={S.imageAddButton}
      onClick={onClick}
      aria-label="이미지 추가"
    >
      <PlusIcon />
    </Button>
  );
};

export default ImageAddButton;
