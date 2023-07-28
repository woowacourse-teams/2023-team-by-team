import type { YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './Thread.styled';
import Text from '~/components/common/Text/Text';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { ThreadSize } from '~/types/size';

interface ThreadProps {
  size?: ThreadSize;
  authorName: string;
  profileImageUrl: string;
  createdAt: YYYYMMDDHHMM;
  content: string;
}

const Thread = (props: ThreadProps) => {
  const {
    size = 'md',
    authorName,
    profileImageUrl,
    createdAt,
    content,
  } = props;
  const createdTime = formatWriteTime(createdAt);

  return (
    <S.Container>
      {size === 'md' && (
        <S.ThreadHeader>
          <S.Author>
            <S.ProfileImg src={profileImageUrl} alt={authorName} />
            <Text size="lg" weight="bold">
              {authorName}
            </Text>
          </S.Author>
          <S.Divider />
          <Text size="lg" weight="bold">
            {createdTime}
          </Text>
        </S.ThreadHeader>
      )}
      <Text size="xl" css={S.contentField}>
        {content}
      </Text>
    </S.Container>
  );
};

export default Thread;
