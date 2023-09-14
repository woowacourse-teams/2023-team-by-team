import * as S from './Carousel.styled';
import Button from '~/components/common/Button/Button';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '~/assets/svg';

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
  images: string[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Carousel = (props: CarouselProps) => {
  const { width, height, images, currentPage, onPageChange } = props;

  return (
    <S.Container width={width} height={height}>
      <S.SlidesView>
        <S.Slides currentPage={currentPage}>
          {images.map((image, index) => (
            <S.Slide key={index}>
              <img src={image} />
            </S.Slide>
          ))}
        </S.Slides>
      </S.SlidesView>
      <S.ArrowCircleLeftButtonWrapper>
        <Button
          variant="plain"
          css={S.arrowButton}
          onClick={() =>
            onPageChange(getPreviousPageIndex(images.length, currentPage))
          }
        >
          <ArrowCircleLeftIcon />
        </Button>
      </S.ArrowCircleLeftButtonWrapper>
      <S.ArrowCircleRightButtonWrapper>
        <Button
          variant="plain"
          css={S.arrowButton}
          onClick={() =>
            onPageChange(getNextPageIndex(images.length, currentPage))
          }
        >
          <ArrowCircleRightIcon />
        </Button>
      </S.ArrowCircleRightButtonWrapper>
    </S.Container>
  );
};

export default Carousel;
