import Carousel from '~/components/feed/Carousel/Carousel';
import PageIndicator from '~/components/feed/PageIndicator/PageIndicator';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import * as S from './ThreadImageModal.styled';
import { useModal } from '~/hooks/useModal';
import { useCarouselPageNo } from '~/hooks/thread/useCarouselPageNo';
import { CloseIcon } from '~/assets/svg';
import type { ThreadImage } from '~/types/feed';

interface ThreadImageModalProps {
  images: ThreadImage[];
  initialPage: number;
}

const ThreadImageModal = (props: ThreadImageModalProps) => {
  const { images, initialPage } = props;
  const { closeModal } = useModal();
  const { currentPage, setCurrentPage } = useCarouselPageNo({
    initialPage,
    pageCount: images.length,
  });

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
            onChangePage={setCurrentPage}
          />
        </S.CarouselWrapper>
        <S.PageIndicatorWrapper>
          <PageIndicator
            pageCount={images.length}
            currentPage={currentPage}
            onChangePage={setCurrentPage}
          />
        </S.PageIndicatorWrapper>
      </S.Container>
    </Modal>
  );
};

export default ThreadImageModal;
