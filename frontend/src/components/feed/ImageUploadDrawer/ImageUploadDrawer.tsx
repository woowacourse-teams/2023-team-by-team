import type { PropsWithChildren } from 'react';
import * as S from './ImageUploadDrawer.styled';
import Button from '~/components/common/Button/Button';
import { CloseBoldIcon } from '~/assets/svg';

interface ImageUploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageUploadDrawer = (
  props: PropsWithChildren<ImageUploadDrawerProps>,
) => {
  const { isOpen, onClose, children } = props;

  return (
    <S.Container isOpen={isOpen}>
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <S.CloseButtonWrapper>
        <Button
          variant="plain"
          type="button"
          css={S.closeButton}
          onClick={onClose}
          aria-label="이미지 업로드 메뉴 닫기"
        >
          <CloseBoldIcon />
        </Button>
      </S.CloseButtonWrapper>
    </S.Container>
  );
};

export default ImageUploadDrawer;
