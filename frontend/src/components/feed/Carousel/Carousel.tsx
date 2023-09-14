import * as S from './Carousel.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '~/assets/svg';
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
  onPageChange: (page: number) => void;
}

const Carousel = (props: CarouselProps) => {
  const { width, height, images, currentPage, onPageChange } = props;

  return (
    <S.Container width={width} height={height}>
      <S.SlidesView>
        <S.Slides currentPage={currentPage}>
          {images.map(({ id, isExpired, url }) => (
            <S.Slide key={id}>
              {isExpired ? (
                <Text as="span" size="xxl" css={S.expiredText}>
                  죄송합니다. 이 이미지는 기간이 만료되었습니다.
                </Text>
              ) : (
                <img src={url} />
              )}
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
          aria-label="이전 이미지 보기"
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
          aria-label="다음 이미지 보기"
        >
          <ArrowCircleRightIcon />
        </Button>
      </S.ArrowCircleRightButtonWrapper>
    </S.Container>
  );
};

export default Carousel;
