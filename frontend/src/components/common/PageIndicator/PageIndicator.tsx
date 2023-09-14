import * as S from './PageIndicator.styled';
import Text from '../Text/Text';
import { arrayOf } from '~/utils/arrayOf';

interface PageIndicatorProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageIndicator = (props: PageIndicatorProps) => {
  const { pageCount, currentPage, onPageChange } = props;

  return (
    <S.Container>
      <S.NumericIndicator>
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
            onClick={() => onPageChange(index + 1)}
            selected={index + 1 === currentPage}
          />
        ))}
      </S.DotIndicator>
    </S.Container>
  );
};

export default PageIndicator;
