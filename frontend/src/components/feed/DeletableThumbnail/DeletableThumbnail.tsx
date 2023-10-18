import * as S from './DeletableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import { CloseBoldIcon } from '~/assets/svg';
import type { SyntheticEvent } from 'react';
import type { PreviewImage } from '~/types/feed';
import { thumbnailFallbackImage } from '~/assets/png';

interface DeletableThumbnailProps {
  image: PreviewImage;
  onDelete: (imageUuid: string) => void;
  isDisabled: boolean;
}

const DeletableThumbnail = (props: DeletableThumbnailProps) => {
  const { image, onDelete, isDisabled } = props;
  const { uuid, url } = image;

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = thumbnailFallbackImage;
    e.currentTarget.alt = '손상된 이미지';
  };

  return (
    <S.Container>
      <S.Image src={url} alt="미리보기 이미지" />
      {!isDisabled && (
        <Button
          variant="plain"
          type="button"
          css={S.deleteButton}
          onClick={() => onDelete(uuid)}
          aria-label={`${url} 이미지 삭제하기`}
        >
          <CloseBoldIcon />
        </Button>
      )}
    </S.Container>
  );
};

export default DeletableThumbnail;
