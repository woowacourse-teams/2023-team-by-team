import { useFetchThreads } from '~/hooks/queries/useFetchThreads';
import * as S from './ThreadList.styled';
import type { ThreadSize } from '~/types/size';
import { THREAD_TYPE } from '~/constants/feed';
import Thread from '~/components/Thread/Thread';
import Notification from '~/components/Notification/Notification';
import { useRef } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import Text from '~/components/common/Text/Text';

interface ThreadListProps {
  size?: ThreadSize;
}

const ThreadList = (props: ThreadListProps) => {
  const { size = 'md' } = props;
  const { threadPages, hasNextPage, fetchNextPage } = useFetchThreads(1);
  const observeRef = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useIntersectionObserver(observeRef, onIntersect);

  return (
    <S.Container>
      {threadPages?.pages.map((page) =>
        page.threads.map((thread) => {
          const { id, type, profileImageUrl, content, ...rest } = thread;
          const profileUrl = profileImageUrl === null ? '' : profileImageUrl;
          return type === THREAD_TYPE.THREAD ? (
            <Thread
              key={id}
              size={size}
              profileImageUrl={profileUrl}
              content={content}
              {...rest}
            />
          ) : (
            <Notification key={id} size={size} content={content} />
          );
        }),
      )}
      {!hasNextPage && (
        <Text size="lg" weight="bold" css={S.lastThreadText}>
          마지막 스레드 입니다.
        </Text>
      )}
      <div ref={observeRef} />
    </S.Container>
  );
};

export default ThreadList;
