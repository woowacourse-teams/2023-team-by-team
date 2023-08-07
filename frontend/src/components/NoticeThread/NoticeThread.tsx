import { useRef } from 'react';
import * as S from './NoticeThread.styled';
import { useThreadHeight } from '~/hooks/thread/useThreadHeight';
import Text from '~/components/common/Text/Text';
import ExpandButton from '~/components/ExpandButton/ExpandButton';
import NoticeTag from './NoticeTag/NoticeTag';
import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatWriteTime } from '~/utils/format/formatWriteTime';
import type { NoticeThreadSize } from '~/types/size';

interface NoticeThreadProps {
  authorName: string;
  profileImageUrl: string;
  createdAt: YYYYMMDDHHMM;
  content: string;
  size?: NoticeThreadSize;
}

const NoticeThread = (props: NoticeThreadProps) => {
  const {
    authorName,
    profileImageUrl,
    createdAt,
    content,
    size = 'md',
  } = props;
  const threadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { shouldShowExpandButton, isExpanded, toggleExpanded, resultHeight } =
    useThreadHeight(threadRef, contentRef);

  return (
    <S.ThreadContainer>
      <S.Thread
        aria-label={`${authorName}의 공지`}
        ref={threadRef}
        height={resultHeight}
        isExpanded={isExpanded}
      >
        {size === 'md' && (
          <S.ThreadHeader>
            <S.ProfileImage src={profileImageUrl} rel="프로필 사진" />
            <Text size="lg" weight="bold">
              {authorName}
            </Text>
            <S.Divider />
            <Text size="lg">{formatWriteTime(createdAt)}</Text>
          </S.ThreadHeader>
        )}
        <S.ContentWrapper ref={contentRef}>
          <Text size="lg">{content}</Text>
        </S.ContentWrapper>
        {shouldShowExpandButton && (
          <ExpandButton isExpanded={isExpanded} onClick={toggleExpanded} />
        )}
      </S.Thread>
      <NoticeTag size={size} css={S.primaryNoticeTag} />
    </S.ThreadContainer>
  );
};

export default NoticeThread;
