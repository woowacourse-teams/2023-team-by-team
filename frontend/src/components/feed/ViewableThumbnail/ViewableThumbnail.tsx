import * as S from './ViewableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import type { ThreadImage } from '~/types/feed';
import type { SyntheticEvent } from 'react';
import { thumbnailFallbackImage } from '~/assets/png';

interface ViewableThumbnailProps {
  image: ThreadImage;
  size?: 'md' | 'sm';
  onClick: () => void;
}

const ViewableThumbnail = (props: ViewableThumbnailProps) => {
  const { image, size = 'md', onClick } = props;
  const { isExpired, name, url } = image;

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = thumbnailFallbackImage;
    e.currentTarget.alt = '손상된 이미지';
  };

  return (
    <S.Container size={size}>
      <Button
        variant="plain"
        type="button"
        css={S.viewButton}
        onClick={onClick}
        aria-label={`${name} 이미지 자세히 보기`}
      >
        <S.Image
          src={isExpired ? thumbnailFallbackImage : url}
          alt={name}
          onError={handleImageError}
        />
      </Button>
    </S.Container>
  );
};

export default ViewableThumbnail;
