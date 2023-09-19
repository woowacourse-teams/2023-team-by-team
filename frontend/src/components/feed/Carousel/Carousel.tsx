import * as S from './Carousel.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
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
  onPageChange: (page: number) => void;
}

const Carousel = (props: CarouselProps) => {
  const { width, height, images, currentPage, onPageChange } = props;

  return (
    <S.Container width={width} height={height}>
      <S.SlidesView>
        <S.Slides currentPage={currentPage}>
          {images.map(({ id, isExpired, url, name }) => (
            <S.Slide key={id}>
              {isExpired ? (
                <Text as="span" size="xxl" css={S.expiredText}>
                  이 이미지는 기간이 만료되었습니다.
                </Text>
              ) : (
                <img src={url} alt={name} />
              )}
            </S.Slide>
          ))}
        </S.Slides>
      </S.SlidesView>
      <S.ArrowCircleLeftButtonWrapper>
        <Button
          variant="plain"
          type="button"
          css={S.arrowButton}
          onClick={() =>
            onPageChange(getPreviousPageIndex(images.length, currentPage))
          }
          aria-label="이전 이미지 보기"
        >
          <ArrowLeftIcon />
        </Button>
      </S.ArrowCircleLeftButtonWrapper>
      <S.ArrowCircleRightButtonWrapper>
        <Button
          variant="plain"
          type="button"
          css={S.arrowButton}
          onClick={() =>
            onPageChange(getNextPageIndex(images.length, currentPage))
          }
          aria-label="다음 이미지 보기"
        >
          <ArrowRightIcon />
        </Button>
      </S.ArrowCircleRightButtonWrapper>
    </S.Container>
  );
};

export default Carousel;
