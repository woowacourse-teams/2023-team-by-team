import { type RefObject, useRef, useEffect, useState } from 'react';
import Thread from '~/components/feed/Thread/Thread';
import EmptyFeedPlaceholder from '~/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder';
import Text from '~/components/common/Text/Text';
import { useFetchThreads } from '~/hooks/queries/useFetchThreads';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { ThreadSize } from '~/types/size';
import { THREAD_TYPE } from '~/constants/feed';
import * as S from './ThreadList.styled';
import type { ThreadImage } from '~/types/feed';

interface ThreadListProps {
  containerRef?: RefObject<HTMLDivElement>;
  size?: ThreadSize;
  onClickImage: (images: ThreadImage[], selectedImage: number) => void;
  isShowScrollBottomButton?: boolean;
}

const ThreadList = (props: ThreadListProps) => {
  const {
    containerRef,
    size = 'md',
    onClickImage,
    isShowScrollBottomButton = false,
  } = props;

  const { teamPlaceId } = useTeamPlace();

  const { threadPages, hasNextPage, fetchNextPage } =
    useFetchThreads(teamPlaceId);

  const threadEndRef = useRef<HTMLDivElement>(null);
  const threadPagesRef = useRef<number>(0);
  const observeRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && teamPlaceId > 0) {
      fetchNextPage();
    }
  };

  useIntersectionObserver(observeRef, onIntersect, hasNextPage);

  useEffect(() => {
    if (!containerRef) return;

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollHeight - scrollHeight;
      containerRef.current.scrollTop = scrollTop;
      setScrollHeight(containerRef.current.scrollHeight);
    }

    /* eslint-disable-next-line */
  }, [threadPages?.pages.length]);

  useEffect(() => {
    if (threadPages?.pages.length !== threadPagesRef.current) {
      threadPagesRef.current = threadPages?.pages.length ?? 0;
    } else {
      if (!threadEndRef.current) {
        return;
      }

      if (isShowScrollBottomButton) {
        return;
      }

      threadEndRef.current.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadPages]);

  return (
    <>
      <div ref={observeRef} />
      {!hasNextPage &&
        threadPages &&
        threadPages.pages[0].threads.length > 0 && (
          <Text size="lg" css={S.lastThreadText}>
            마지막 채팅 입니다.
          </Text>
        )}
      {threadPages?.pages
        .slice()
        .reverse()
        .map((page) =>
          page.threads
            .slice()
            .reverse()
            .map((thread, index, threads) => {
              const { id, type, profileImageUrl, content, authorId, ...rest } =
                thread;

              const isContinue =
                index - 1 >= 0 && authorId === threads[index - 1].authorId;

              return type === THREAD_TYPE.THREAD ? (
                <Thread
                  key={id}
                  threadSize={size}
                  profileImageUrl={profileImageUrl}
                  content={content}
                  isContinue={isContinue}
                  onClickImage={onClickImage}
                  {...rest}
                />
              ) : // <Notification
              //   teamPlaceColor={teamPlaceColor}
              //   key={id}
              //   threadSize={size}
              //   content={content}
              // />
              null;
            }),
        )}
      <div ref={threadEndRef} />
      {threadPages && threadPages.pages[0].threads.length === 0 && (
        <EmptyFeedPlaceholder />
      )}
    </>
  );
};

export default ThreadList;
