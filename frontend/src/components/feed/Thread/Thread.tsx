import type { YYYYMMDDHHMM } from '~/types/schedule';
import * as S from './Thread.styled';
import Text from '~/components/common/Text/Text';
import { formatWriteTime } from '~/utils/formatWriteTime';
import type { ThreadSize } from '~/types/size';
import type { ThreadImage } from '~/types/feed';
import { useRef } from 'react';
import { useThreadHeight } from '~/hooks/thread/useThreadHeight';
import ThreadExpandButton from '~/components/feed/ThreadExpandButton/ThreadExpandButton';
import ThumbnailList from '../ThumbnailList/ThumbnailList';

interface ThreadProps {
  threadSize?: ThreadSize;
  authorName: string;
  profileImageUrl: string;
  isMe?: boolean;
  createdAt: YYYYMMDDHHMM;
  content: string;
  images: ThreadImage[];
  isContinue: boolean;
  onClickImage: (images: ThreadImage[], selectedImage: number) => void;
}

const Thread = (props: ThreadProps) => {
  const {
    threadSize = 'md',
    authorName,
    profileImageUrl,
    isMe = false,
    createdAt,
    content,
    images,
    isContinue,
    onClickImage,
  } = props;
  const createdTime = formatWriteTime(createdAt).split(' ').join('\n');

  const threadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { shouldShowExpandButton, isExpanded, toggleExpanded, resultHeight } =
    useThreadHeight(threadRef, contentRef);

  return (
    <S.Container $isMe={isMe}>
      {!isMe && !isContinue && (
        <S.ThreadHeader>
          <S.Author>
            <S.ProfileImg src={profileImageUrl} alt={authorName} />
            <Text weight="semiBold" css={S.threadInfoText}>
              {authorName}
            </Text>
          </S.Author>
        </S.ThreadHeader>
      )}
      <S.BodyContainer $isMe={isMe}>
        <S.ContentContainer $isMe={isMe} ref={threadRef} $height={resultHeight}>
          <S.ContentWrapper>
            <div ref={contentRef}>
              <Text css={S.contentField(threadSize, isMe)}>{content}</Text>
            </div>
          </S.ContentWrapper>
          {images.length > 0 && (
            <S.ThumbnailListWrapper
              isMe={isMe}
              marginBottom={!shouldShowExpandButton}
            >
              <ThumbnailList
                mode="view"
                images={images}
                onClick={onClickImage}
              />
            </S.ThumbnailListWrapper>
          )}
          {shouldShowExpandButton && (
            <ThreadExpandButton
              isExpanded={isExpanded}
              isMe={isMe}
              size={threadSize}
              onClick={toggleExpanded}
            />
          )}
        </S.ContentContainer>
        <time>
          <Text css={S.threadInfoText}>{createdTime}</Text>
        </time>
      </S.BodyContainer>
    </S.Container>
  );
};

export default Thread;
