import * as S from './EmptyFeedPlaceholder.styled';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { feedEmptyImage } from '~/assets/png';

interface EmptyFeedPlaceholderProps {
  onClick: () => void;
}

const EmptyFeedPlaceholder = (props: EmptyFeedPlaceholderProps) => {
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
          <S.FeedEmptyImage src={feedEmptyImage} alt="비어있는 피드 이미지" />
          <Text weight="bold" css={S.titleText}>
            등록된 피드가 없어요
          </Text>
          <Text weight="semiBold" css={S.clickToAddText}>
            여기를 클릭해 새로운 피드를 작성해보세요
          </Text>
        </S.PlaceholderContainer>
      </Button>
    </S.Container>
  );
};

export default EmptyFeedPlaceholder;
