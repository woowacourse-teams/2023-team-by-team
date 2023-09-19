import * as S from './ViewableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import type { ThreadImage } from '~/types/feed';
import { thumbnailFallbackImage } from '~/assets/png';

interface ViewableThumbnailProps {
  image: ThreadImage;
  onClick: () => void;
}

const ViewableThumbnail = (props: ViewableThumbnailProps) => {
  const { image, onClick } = props;
  const { isExpired, name, url } = image;

  return (
    <S.Container>
      <Button
        variant="plain"
        type="button"
        css={S.viewButton}
        onClick={onClick}
      >
        <S.Image src={isExpired ? thumbnailFallbackImage : url} alt={name} />
      </Button>
    </S.Container>
  );
};

export default ViewableThumbnail;
