import { PlusIcon } from '~/assets/svg';
import * as S from './ImageAddButton.styled';
import type { ChangeEvent } from 'react';

interface ImageAddButtonProps {
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageAddButton = (props: ImageAddButtonProps) => {
  const { onChangeImage } = props;

  return (
    <label>
      <S.FakeButton role="button" aria-label="이미지 추가">
        <PlusIcon />
      </S.FakeButton>
      <S.FileUploadInput
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        multiple
      />
    </label>
  );
};

export default ImageAddButton;
