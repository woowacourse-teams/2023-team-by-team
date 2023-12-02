import * as S from './PageIndicator.styled';
import Text from '~/components/common/Text/Text';
import { arrayOf } from '~/utils/arrayOf';

interface PageIndicatorProps {
  pageCount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const PageIndicator = (props: PageIndicatorProps) => {
  const { pageCount, currentPage, onChangePage } = props;

  return (
    <S.Container>
      <S.NumericIndicator
        aria-label={`${pageCount}개의 페이지 중 ${currentPage}번째 페이지`}
      >
        <Text as="span" weight="semiBold" css={S.currentPageText}>
          {currentPage}
        </Text>
        <Text
          as="span"
          weight="semiBold"
          css={S.pageCountText}
        >{`/${pageCount}`}</Text>
      </S.NumericIndicator>
      <S.DotIndicator>
        {arrayOf(pageCount).map((_, index) => (
          <S.Dot
            key={index}
            type="button"
            onClick={() => onChangePage(index + 1)}
            $selected={index + 1 === currentPage}
            aria-label={`${index + 1}번째 페이지 보기`}
          />
        ))}
      </S.DotIndicator>
    </S.Container>
  );
};

export default PageIndicator;
