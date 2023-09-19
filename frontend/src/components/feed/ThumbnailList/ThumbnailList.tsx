import * as S from './ThumbnailList.styled';
import DeletableThumbnail from '~/components/feed/DeletableThumbnail/DeletableThumbnail';
import ViewableThumbnail from '~/components/feed/ViewableThumbnail/ViewableThumbnail';
import type { ThreadImage } from '~/types/feed';

type ThumbnailListProps = DeletableThumbnails | ViewableThumbnails;

interface DeletableThumbnails {
  mode: 'delete';
  images: ThreadImage[];
  onDelete: (imageId: number) => void;
}

interface ViewableThumbnails {
  mode: 'view';
  images: ThreadImage[];
  onClick: (images: ThreadImage[], selectedImage: number) => void;
}

const ThumbnailList = (props: ThumbnailListProps) => {
  const { mode, images } = props;

  return (
    <S.Container role="list">
      {images.map((image, index) =>
        mode === 'delete' ? (
          <DeletableThumbnail
            key={image.id}
            image={image}
            onDelete={props.onDelete}
          />
        ) : (
          <ViewableThumbnail
            key={image.id}
            image={image}
            onClick={() => props.onClick(images, index + 1)}
          />
        ),
      )}
    </S.Container>
  );
};

export default ThumbnailList;
