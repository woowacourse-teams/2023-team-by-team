import * as S from './DeletableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import { CloseBoldIcon } from '~/assets/svg';
import type { PreviewImage } from '~/types/feed';
import type { UUID } from 'crypto';

interface DeletableThumbnailProps {
  image: PreviewImage;
  onDelete: (imageUuid: UUID) => void;
}

const DeletableThumbnail = (props: DeletableThumbnailProps) => {
  const { image, onDelete } = props;
  const { uuid, url } = image;

  return (
    <S.Container>
      <S.Image src={url} alt="미리보기 이미지" />
      <Button
        variant="plain"
        type="button"
        css={S.deleteButton}
        onClick={() => onDelete(uuid)}
        aria-label={`${url} 이미지 삭제하기`}
      >
        <CloseBoldIcon />
      </Button>
    </S.Container>
  );
};

export default DeletableThumbnail;
