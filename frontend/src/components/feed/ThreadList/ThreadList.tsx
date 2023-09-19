import { useFetchThreads } from '~/hooks/queries/useFetchThreads';
import * as S from './ThreadList.styled';
import type { ThreadSize } from '~/types/size';
import { THREAD_TYPE } from '~/constants/feed';
import NoticeThread from '~/components/feed/NoticeThread/NoticeThread';
import { type RefObject, useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import Text from '~/components/common/Text/Text';
import { useFetchNoticeThread } from '~/hooks/queries/useFetchNoticeThread';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import Notification from '~/components/feed/Notification/Notification';
import Thread from '~/components/feed/Thread/Thread';
import EmptyFeedPlaceholder from '~/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder';
import { useModal } from '~/hooks/useModal';

interface ThreadListProps {
  containerRef?: RefObject<HTMLDivElement>;
  size?: ThreadSize;
}

const ThreadList = (props: ThreadListProps) => {
  const { containerRef, size = 'md' } = props;
  const { teamPlaceId, teamPlaceColor } = useTeamPlace();
  const { threadPages, hasNextPage, fetchNextPage } =
    useFetchThreads(teamPlaceId);
  const { noticeThread } = useFetchNoticeThread(teamPlaceId);
  const observeRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const { openModal } = useModal();

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
  }, [threadPages?.pages.length]);

  return (
    <>
      <div ref={observeRef} />
      {noticeThread && noticeThread.id && (
        <NoticeThread
          authorName={noticeThread.authorName}
          createdAt={noticeThread.createdAt}
          content={noticeThread.content}
        />
      )}
      {!hasNextPage &&
        threadPages &&
        threadPages.pages[0].threads.length > 0 && (
          <Text size="lg" css={S.lastThreadText}>
            마지막 스레드 입니다.
          </Text>
        )}
      {threadPages?.pages
        .slice()
        .reverse()
        .map((page) =>
          page.threads
            .slice()
            .reverse()
            .map((thread) => {
              const { id, type, profileImageUrl, content, ...rest } = thread;

              return type === THREAD_TYPE.THREAD ? (
                <Thread
                  key={id}
                  threadSize={size}
                  profileImageUrl={profileImageUrl}
                  content={content}
                  {...rest}
                />
              ) : (
                <Notification
                  teamPlaceColor={teamPlaceColor}
                  key={id}
                  threadSize={size}
                  content={content}
                />
              );
            }),
        )}
      {!(noticeThread && noticeThread.id) &&
        threadPages &&
        threadPages.pages[0].threads.length === 0 && (
          <EmptyFeedPlaceholder onClick={openModal} />
        )}
    </>
  );
};

export default ThreadList;
