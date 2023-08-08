import { useFetchThreads } from '~/hooks/queries/useFetchThreads';
import * as S from './ThreadList.styled';
import type { ThreadSize } from '~/types/size';
import { THREAD_TYPE } from '~/constants/feed';
import NoticeThread from '~/components/feed/NoticeThread/NoticeThread';
import { useRef } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import Text from '~/components/common/Text/Text';
import { useFetchNoticeThread } from '~/hooks/queries/useFetchNoticeThread';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import Notification from '~/components/feed/Notification/Notification';
import Thread from '~/components/feed/Thread/Thread';

interface ThreadListProps {
  size?: ThreadSize;
}

const ThreadList = (props: ThreadListProps) => {
  const { size = 'md' } = props;
  const { teamPlaceId, teamPlaceColor } = useTeamPlace();
  const { threadPages, hasNextPage, fetchNextPage } =
    useFetchThreads(teamPlaceId);
  const { noticeThread } = useFetchNoticeThread(teamPlaceId);
  const observeRef = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useIntersectionObserver(observeRef, onIntersect);

  return (
    <>
      {noticeThread && noticeThread.id && (
        <NoticeThread
          authorName={noticeThread.authorName}
          createdAt={noticeThread.createdAt}
          profileImageUrl={noticeThread.profileImageUrl}
          content={noticeThread.content}
        />
      )}
      {threadPages?.pages.map((page) =>
        page.threads.map((thread) => {
          const { id, type, profileImageUrl, content, ...rest } = thread;

          return type === THREAD_TYPE.THREAD ? (
            <Thread
              key={id}
              size={size}
              profileImageUrl={profileImageUrl}
              content={content}
              {...rest}
            />
          ) : (
            <Notification
              teamPlaceColor={teamPlaceColor}
              key={id}
              size={size}
              content={content}
            />
          );
        }),
      )}
      {!hasNextPage && (
        <Text size="lg" css={S.lastThreadText}>
          마지막 스레드 입니다.
        </Text>
      )}
      <div ref={observeRef} />
    </>
  );
};

export default ThreadList;