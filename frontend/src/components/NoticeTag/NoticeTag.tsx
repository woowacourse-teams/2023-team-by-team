import * as S from './NoticeTag.styled';
import { MegaphoneIcon } from '~/assets/svg';
import type { CSSProp } from 'styled-components';
import Text from '~/components/common/Text/Text';
import type { NoticeTagSize } from '~/types/size';

export interface NoticeTagProps {
  size?: NoticeTagSize;
  css?: CSSProp;
}

const NoticeTag = (props: NoticeTagProps) => {
  const { size, css } = props;

  return (
    <S.TagContainer size={size} css={css}>
      <MegaphoneIcon />
      {size === 'md' && (
        <Text size="lg" weight="bold" css={S.tagLabel}>
          중요 공지
        </Text>
      )}
    </S.TagContainer>
  );
};

export default NoticeTag;
