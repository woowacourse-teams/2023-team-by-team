import * as S from './DeletableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import type { ThreadImage } from '~/types/feed';
import { Close2Icon } from '~/assets/svg';
import { thumbnailFallbackImage } from '~/assets/png';

interface DeletableThumbnailProps {
  image: ThreadImage;
  onDelete: (imageId: number) => void;
}

const DeletableThumbnail = (props: DeletableThumbnailProps) => {
  const { image, onDelete } = props;
  const { id, isExpired, name, url } = image;

  return (
    <S.Container>
      <S.Image src={isExpired ? thumbnailFallbackImage : url} alt={name} />
      <Button
        variant="plain"
        type="button"
        css={S.deleteButton}
        onClick={() => onDelete(id)}
        aria-label={`${name} 이미지 삭제하기`}
      >
        <Close2Icon />
      </Button>
    </S.Container>
  );
};

export default DeletableThumbnail;
