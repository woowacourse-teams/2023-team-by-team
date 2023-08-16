import type { YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './Thread.styled';
import Text from '~/components/common/Text/Text';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { ThreadSize } from '~/types/size';

interface ThreadProps {
  threadSize?: ThreadSize;
  authorName: string;
  profileImageUrl: string;
  createdAt: YYYYMMDDHHMM;
  content: string;
}

const Thread = (props: ThreadProps) => {
  const {
    threadSize = 'md',
    authorName,
    profileImageUrl,
    createdAt,
    content,
  } = props;
  const createdTime = formatWriteTime(createdAt);

  return (
    <S.Container threadSize={threadSize}>
      <S.ThreadHeader>
        <S.Author>
          <S.ProfileImg
            threadSize={threadSize}
            src={profileImageUrl}
            alt={authorName}
          />
          <Text weight="bold" css={S.threadInfoText(threadSize)}>
            {authorName}
          </Text>
        </S.Author>
        <S.Divider />
        <time>
          <Text css={S.threadInfoText(threadSize)}>{createdTime}</Text>
        </time>
      </S.ThreadHeader>
      <Text size="xl" css={S.contentField(threadSize)}>
        {content}
      </Text>
    </S.Container>
  );
};

export default Thread;
