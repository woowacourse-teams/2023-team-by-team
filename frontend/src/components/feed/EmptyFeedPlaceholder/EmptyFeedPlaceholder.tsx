import Text from '~/components/common/Text/Text';
import { feedEmptyImage } from '~/assets/png';
import * as S from './EmptyFeedPlaceholder.styled';

const EmptyFeedPlaceholder = () => {
  return (
    <S.Container>
      <S.PlaceholderContainer>
        <S.FeedEmptyImage src={feedEmptyImage} alt="비어있는 피드 이미지" />
        <Text weight="bold" css={S.titleText}>
          대화를 시작해 보세요!
        </Text>
      </S.PlaceholderContainer>
    </S.Container>
  );
};

export default EmptyFeedPlaceholder;
