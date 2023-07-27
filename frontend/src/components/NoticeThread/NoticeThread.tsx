import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import * as S from './NoticeThread.styled';
import { useThreadHeight } from '~/hooks/thread/useThreadHeight';
import Text from '~/components/common/Text/Text';
import ExpandButton from './ExpandButton/ExpandButton';
import Tag from './Tag/Tag';
import { ClockIcon } from '~/assets/svg';

interface NoticeThreadProps {
  author: string;
  profileImageSrc: string;
  date: string;
}

const NoticeThread = (props: PropsWithChildren<NoticeThreadProps>) => {
  const { author, profileImageSrc, children } = props;
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
          <S.PostDateContainer>
            <ClockIcon width="24px" height="24px" />
            <Text size="lg">2023/01/21 22:00</Text>
          </S.PostDateContainer>
        </S.ThreadHeader>
        <S.Content ref={contentRef}>{children}</S.Content>
        {shouldShowExpandButton && (
          <ExpandButton isExpanded={isExpanded} onClick={toggleExpanded} />
        )}
      </S.Thread>
      <Tag css={S.primaryNoticeTag} />
    </S.ThreadContainer>
  );
};

export default NoticeThread;
