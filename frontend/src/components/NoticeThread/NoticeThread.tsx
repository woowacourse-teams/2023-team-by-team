import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import * as S from './NoticeThread.styled';
import { useThreadHeight } from '~/hooks/thread/useThreadHeight';
import Text from '~/components/common/Text/Text';
import ExpandButton from '~/components/ExpandButton/ExpandButton';
import NoticeTag from '~/components/NoticeTag/NoticeTag';
import type { YYYYMMDDHHMM } from '~/types/schedule';
import { formatWriteTime } from '~/utils/formatWriteTime';

interface NoticeThreadProps {
  author: string;
  profileImageSrc: string;
  createdAt: YYYYMMDDHHMM;
}

const NoticeThread = (props: PropsWithChildren<NoticeThreadProps>) => {
  const { author, profileImageSrc, createdAt, children } = props;
  const threadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { shouldShowExpandButton, isExpanded, toggleExpanded, resultHeight } =
    useThreadHeight(threadRef, contentRef);

  return (
    <S.ThreadContainer>
      <S.Thread
        aria-label={`${author}의 공지`}
        ref={threadRef}
        height={resultHeight}
        isExpanded={isExpanded}
      >
        <S.ThreadHeader>
          <S.ProfileImage src={profileImageSrc} rel="프로필 사진" />
          <Text size="lg" weight="bold">
            {author}
          </Text>
          <S.Divider />
          <Text size="lg">{formatWriteTime(createdAt)}</Text>
        </S.ThreadHeader>
        <S.ContentWrapper ref={contentRef}>
          <Text>{children}</Text>
        </S.ContentWrapper>
        {shouldShowExpandButton && (
          <ExpandButton isExpanded={isExpanded} onClick={toggleExpanded} />
        )}
      </S.Thread>
      <NoticeTag css={S.primaryNoticeTag} />
    </S.ThreadContainer>
  );
};

export default NoticeThread;
