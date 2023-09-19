import * as S from './DeletableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import type { ThreadImage } from '~/types/feed';
import { Close2Icon } from '~/assets/svg';

interface ImageAddButtonProps {
  image: ThreadImage;
  onDelete: (imageId: number) => void;
}

const DeletableThumbnail = (props: ImageAddButtonProps) => {
  const { image, onDelete } = props;
  const { id, name, url } = image;

  return (
    <S.Container>
      <S.Image src={url} alt={name} />
      <Button
        variant="plain"
        type="button"
        css={S.deleteButton}
        onClick={() => onDelete(id)}
      >
        <Close2Icon />
      </Button>
    </S.Container>
  );
};

export default DeletableThumbnail;
