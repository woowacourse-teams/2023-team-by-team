import type { PropsWithChildren } from 'react';
import * as S from './ImageUploadDrawer.styled';
import Button from '~/components/common/Button/Button';
import { CloseBoldIcon } from '~/assets/svg';
import { getIsMobile } from '~/utils/getIsMobile';

interface ImageUploadDrawerProps {
  isOpen: boolean;
  slideDistance: number;
  onClose: () => void;
  isUploading: boolean;
}

const ImageUploadDrawer = (
  props: PropsWithChildren<ImageUploadDrawerProps>,
) => {
  const { isOpen, onClose, children, isUploading, slideDistance } = props;
  const isMobile = getIsMobile();

  return (
    <S.Container
      $isOpen={isOpen}
      $isMobile={isMobile}
      $slideDistance={slideDistance}
    >
      <S.ContentWrapper>{children}</S.ContentWrapper>
      {!isUploading && (
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
      )}
    </S.Container>
  );
};

export default ImageUploadDrawer;
