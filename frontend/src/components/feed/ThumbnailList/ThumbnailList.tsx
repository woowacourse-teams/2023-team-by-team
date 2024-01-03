import * as S from './ThumbnailList.styled';
import DeletableThumbnail from '~/components/feed/DeletableThumbnail/DeletableThumbnail';
import ViewableThumbnail from '~/components/feed/ViewableThumbnail/ViewableThumbnail';
import type { ThreadImage, PreviewImage } from '~/types/feed';
import type { ChangeEventHandler } from 'react';
import ImageAddButton from '../ImageAddButton/ImageAddButton';
import { MAX_UPLOAD_IMAGE_COUNT } from '~/constants/feed';

type ThumbnailListProps = DeletableThumbnails | ViewableThumbnails;

interface DeletableThumbnails {
  mode: 'delete';
  images: PreviewImage[];
  onDelete: (imageUuid: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isUploading: boolean;
}

interface ViewableThumbnails {
  mode: 'view';
  images: ThreadImage[];
  size?: 'md' | 'sm';
  onClick: (images: ThreadImage[], selectedImage: number) => void;
}

const ThumbnailList = (props: ThumbnailListProps) => {
  const { mode, images } = props;

  return (
    <S.Container
      role="list"
      $mode={mode}
      $size={mode === 'view' ? props.size : undefined}
    >
      {mode === 'delete'
        ? images.map((image) => (
            <DeletableThumbnail
              key={image.uuid}
              image={image}
              onDelete={props.onDelete}
              isUploading={props.isUploading}
            />
          ))
        : images.map((image, index) => (
            <ViewableThumbnail
              key={image.id}
              image={image}
              size={props.size}
              onClick={() => props.onClick(images, index + 1)}
            />
          ))}
      {mode === 'delete' &&
        images.length < MAX_UPLOAD_IMAGE_COUNT &&
        !props.isUploading && <ImageAddButton onChangeImage={props.onChange} />}
    </S.Container>
  );
};

export default ThumbnailList;
