import * as S from './ViewableThumbnail.styled';
import Button from '~/components/common/Button/Button';
import type { ThreadImage } from '~/types/feed';

interface ViewableThumbnailProps {
  image: ThreadImage;
  onClick: () => void;
}

const ViewableThumbnail = (props: ViewableThumbnailProps) => {
  const { image, onClick } = props;
  const { name, url } = image;

  return (
    <Button variant="plain" type="button" css={S.viewButton} onClick={onClick}>
      <S.Image src={url} alt={name} />
    </Button>
  );
};

export default ViewableThumbnail;
