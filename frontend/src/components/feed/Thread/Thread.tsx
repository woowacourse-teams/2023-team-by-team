import type { YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './Thread.styled';
import Text from '~/components/common/Text/Text';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { ThreadSize } from '~/types/size';
import type { ThreadImage } from '~/types/feed';

interface ThreadProps {
  threadSize?: ThreadSize;
  authorName: string;
  profileImageUrl: string;
  isMe: boolean;
  createdAt: YYYYMMDDHHMM;
  content: string;
  images: ThreadImage[];
}

const Thread = (props: ThreadProps) => {
  const {
    threadSize = 'md',
    authorName,
    profileImageUrl,
    isMe,
    createdAt,
    content,
    images,
  } = props;
  const createdTime = formatWriteTime(createdAt).split(' ').join('\n');

  return (
    <S.Container isMe={isMe}>
      {!isMe && (
        <S.ThreadHeader>
          <S.Author>
            <S.ProfileImg
              threadSize={threadSize}
              src={profileImageUrl}
              alt={authorName}
            />
            <Text weight="bold" css={S.threadInfoText(threadSize, isMe)}>
              {authorName}
            </Text>
          </S.Author>
        </S.ThreadHeader>
      )}
      <S.ContentContainer isMe={isMe}>
        <S.ContentWrapper threadSize={threadSize} isMe={isMe}>
          <Text size="xl" css={S.contentField(threadSize, isMe)}>
            {content}
          </Text>
        </S.ContentWrapper>
        <time>
          <Text css={S.threadInfoText(threadSize, isMe)}>{createdTime}</Text>
        </time>
      </S.ContentContainer>
    </S.Container>
  );
};

export default Thread;
