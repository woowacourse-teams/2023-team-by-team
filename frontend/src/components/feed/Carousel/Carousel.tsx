import * as S from './Carousel.styled';
import CarouselImage from '../CarouselImage/CarouselImage';
import Button from '~/components/common/Button/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/svg';
import type { ThreadImage } from '~/types/feed';

export const getNextPageIndex = (pageCount: number, currentPage: number) => {
  return currentPage === pageCount ? 1 : currentPage + 1;
};

export const getPreviousPageIndex = (
  pageCount: number,
  currentPage: number,
) => {
  return currentPage === 1 ? pageCount : currentPage - 1;
};

interface CarouselProps {
  width: string;
  height: string;
  images: ThreadImage[];
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Carousel = (props: CarouselProps) => {
  const { width, height, images, currentPage, onChangePage } = props;
  const hasSingleImage = images.length === 1;

  return (
    <S.Container width={width} height={height}>
      <S.SlidesView>
        <S.Slides currentPage={currentPage}>
          {images.map((image) => (
            <CarouselImage key={image.id} image={image} />
          ))}
        </S.Slides>
      </S.SlidesView>
      <S.ArrowCircleLeftButtonWrapper>
        <Button
          variant="plain"
          type="button"
          css={S.arrowButton(hasSingleImage)}
          onClick={() =>
            onChangePage(getPreviousPageIndex(images.length, currentPage))
          }
          disabled={hasSingleImage}
          aria-label="이전 이미지 보기"
        >
          <ArrowLeftIcon />
        </Button>
      </S.ArrowCircleLeftButtonWrapper>
      <S.ArrowCircleRightButtonWrapper>
        <Button
          variant="plain"
          type="button"
          css={S.arrowButton(hasSingleImage)}
          onClick={() =>
            onChangePage(getNextPageIndex(images.length, currentPage))
          }
          disabled={hasSingleImage}
          aria-label="다음 이미지 보기"
        >
          <ArrowRightIcon />
        </Button>
      </S.ArrowCircleRightButtonWrapper>
    </S.Container>
  );
};

export default Carousel;
