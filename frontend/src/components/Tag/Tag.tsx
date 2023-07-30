import * as S from './Tag.styled';
import { MegaphoneIcon } from '~/assets/svg';
import type { CSSProp } from 'styled-components';
import Text from '~/components/common/Text/Text';

export interface TagProps {
  css?: CSSProp;
}

const Tag = (props: TagProps) => {
  const { css } = props;

  return (
    <S.TagContainer css={css}>
      <MegaphoneIcon width="24px" height="24px" style={{ color: 'white' }} />
      <Text size="lg" weight="bold" css={S.tagLabel}>
        중요 공지
      </Text>
    </S.TagContainer>
  );
};

export default Tag;
