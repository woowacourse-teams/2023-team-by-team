import Carousel from '~/components/feed/Carousel/Carousel';
import PageIndicator from '~/components/common/PageIndicator/PageIndicator';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import * as S from './ThreadImageModal.styled';
import { useState } from 'react';
import { useModal } from '~/hooks/useModal';
import { CloseIcon } from '~/assets/svg';
import type { ThreadImage } from '~/types/feed';

interface ThreadImageModalProps {
  images: ThreadImage[];
  initialPage: number;
}

const ThreadImageModal = (props: ThreadImageModalProps) => {
  const { images, initialPage } = props;
  const { closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <Modal>
      <S.Container>
        <S.HeaderWrapper>
          <Text as="span" size="xxl" weight="semiBold" css={S.title}>
            {images[currentPage - 1].name}
          </Text>
          <Button
            variant="plain"
            type="button"
            css={S.closeButton}
            onClick={closeModal}
          >
            <CloseIcon />
          </Button>
        </S.HeaderWrapper>
        <S.CarouselWrapper>
          <Carousel
            width="100%"
            height="100%"
            images={images}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </S.CarouselWrapper>
        <S.PageIndicatorWrapper>
          <PageIndicator
            pageCount={images.length}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </S.PageIndicatorWrapper>
      </S.Container>
    </Modal>
  );
};

export default ThreadImageModal;
