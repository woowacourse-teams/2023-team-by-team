import * as S from './EmptyLinkPlaceholder.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { linkEmptyImage } from '~/assets/png';

interface EmptyLinkPlaceholderProps {
  onClick: () => void;
}

const EmptyLinkPlaceholder = (props: EmptyLinkPlaceholderProps) => {
  const { onClick } = props;

  return (
    <S.Container>
      <Button
        variant="plain"
        onClick={onClick}
        css={S.placeholderButton}
        aria-label="새로운 링크 등록하기"
      >
        <S.PlaceholderContainer>
          <S.LinkEmptyImage src={linkEmptyImage} alt="비어있는 링크 이미지" />
          <Text weight="bold" css={S.titleText}>
            등록된 링크가 없어요
          </Text>
          <Text weight="semiBold" css={S.clickToAddText}>
            여기를 클릭해 새로운 링크를 등록해보세요
          </Text>
        </S.PlaceholderContainer>
      </Button>
    </S.Container>
  );
};

export default EmptyLinkPlaceholder;
