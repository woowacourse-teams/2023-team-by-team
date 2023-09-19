import type { YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './Thread.styled';
import Text from '~/components/common/Text/Text';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { ThreadSize } from '~/types/size';
import type { ThreadImage } from '~/types/feed';
import { useRef } from 'react';
import { useThreadHeight } from '~/hooks/thread/useThreadHeight';
import ExpandButton from '~/components/common/ExpandButton/ExpandButton';

interface ThreadProps {
  threadSize?: ThreadSize;
  authorName: string;
  profileImageUrl: string;
  isMe: boolean;
  createdAt: YYYYMMDDHHMM;
  content: string;
  images: ThreadImage[];
  isContinuity: boolean;
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
    isContinuity,
  } = props;
  const createdTime = formatWriteTime(createdAt).split(' ').join('\n');

  const threadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { shouldShowExpandButton, isExpanded, toggleExpanded, resultHeight } =
    useThreadHeight(threadRef, contentRef);

  return (
    <S.Container isMe={isMe}>
      {!isMe && !isContinuity && (
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
      <S.BodyContainer isMe={isMe}>
        <S.ContentContainer isMe={isMe} ref={threadRef} height={resultHeight}>
          <S.ContentWrapper
            ref={contentRef}
            isExpanded={isExpanded}
            threadSize={threadSize}
            isMe={isMe}
          >
            <Text size="xl" css={S.contentField(threadSize, isMe)}>
              {content}
            </Text>
            {shouldShowExpandButton && (
              <ExpandButton isExpanded={isExpanded} onClick={toggleExpanded} />
            )}
          </S.ContentWrapper>
        </S.ContentContainer>
        <time>
          <Text css={S.threadInfoText(threadSize, isMe)}>{createdTime}</Text>
        </time>
      </S.BodyContainer>
    </S.Container>
  );
};

export default Thread;
