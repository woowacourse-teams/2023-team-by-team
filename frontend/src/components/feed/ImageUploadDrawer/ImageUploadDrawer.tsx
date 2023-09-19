import type { PropsWithChildren } from 'react';
import * as S from './ImageUploadDrawer.styled';
import Button from '~/components/common/Button/Button';
import { Close2Icon } from '~/assets/svg';

interface ImageUploadDrawerProps {
  isOpen: boolean;
  slideDistance: number;
  onClose: () => void;
}

const ImageUploadDrawer = (
  props: PropsWithChildren<ImageUploadDrawerProps>,
) => {
  const { isOpen, slideDistance, onClose, children } = props;

  return (
    <S.Container bottom={isOpen ? slideDistance : 0}>
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <S.CloseButtonWrapper>
        <Button
          variant="plain"
          type="button"
          css={S.closeButton}
          onClick={onClose}
        >
          <Close2Icon />
        </Button>
      </S.CloseButtonWrapper>
    </S.Container>
  );
};

export default ImageUploadDrawer;
