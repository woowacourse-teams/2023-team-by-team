import { useRef, useEffect, useState, Fragment } from 'react';
import type { RefObject } from 'react';
import Thread from '~/components/feed/Thread/Thread';
import EmptyFeedPlaceholder from '~/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder';
import Notification from '~/components/feed/Notification/Notification';
import Text from '~/components/common/Text/Text';
import { useFetchThreads } from '~/hooks/queries/useFetchThreads';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useFirstDateTime } from '~/hooks/thread/useFirstDateTime';
import type { ThreadSize } from '~/types/size';
import { THREAD_TYPE } from '~/constants/feed';
import * as S from './ThreadList.styled';
import type { ThreadImage } from '~/types/feed';
import { formatDate } from '~/utils/formatDate';
import { splitDateTime } from '~/utils/splitDateTime';
import type { YYYYMMDD } from '~/types/schedule';

interface ThreadListProps {
  containerRef?: RefObject<HTMLDivElement>;
  size?: ThreadSize;
  onClickImage: (images: ThreadImage[], selectedImage: number) => void;
  isShowScrollBottomButton?: boolean;
}

const checkFirstThreadOfDay = (
  currentDate: YYYYMMDD,
  firstDate?: YYYYMMDD,
  previousDate?: YYYYMMDD,
) => {
  if (previousDate) {
    return currentDate !== previousDate;
  }

  if (!firstDate) {
    return true;
  }

  return currentDate !== firstDate;
};

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
  const observeRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const { firstDate, setFirstDateTime } = useFirstDateTime();

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && teamPlaceId > 0) {
      fetchNextPage();
    }
  };

  useIntersectionObserver(observeRef, onIntersect, hasNextPage);

  useEffect(() => {
    const containerElement = containerRef?.current;

    if (!containerElement) return;

    const scrollTop = containerElement.scrollHeight - scrollHeight;
    containerElement.scrollTop = scrollTop;
    setScrollHeight(() => containerElement.scrollHeight);

    if (threadPages) {
      const newFirstDateTime = threadPages.pages.at(-1)?.threads.at(-1)
        ?.createdAt;

      setFirstDateTime(() => newFirstDateTime);
    }

    /* eslint-disable-next-line */
  }, [threadPages?.pages.length]);

  useEffect(() => {
    if (!threadEndRef.current) {
      return;
    }

    threadEndRef.current.scrollIntoView();
  }, [teamPlaceId]);

  useEffect(() => {
    if (!threadEndRef.current) {
      return;
    }

    if (isShowScrollBottomButton) {
      return;
    }

    threadEndRef.current.scrollIntoView();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadPages?.pages[0].threads.length]);

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
              const {
                id,
                type,
                profileImageUrl,
                content,
                authorId,
                createdAt,
                ...rest
              } = thread;

              const previousThread = threads[index - 1];
              const currentDateTime = splitDateTime(createdAt);
              const previousDateTime = previousThread
                ? splitDateTime(previousThread.createdAt)
                : null;

              const isFirstThreadOfDay = checkFirstThreadOfDay(
                currentDateTime.date,
                firstDate,
                previousDateTime?.date,
              );

              const isContinue =
                index - 1 >= 0 &&
                authorId === previousThread.authorId &&
                !isFirstThreadOfDay;

              return type === THREAD_TYPE.THREAD ? (
                <Fragment key={id}>
                  {isFirstThreadOfDay && (
                    <Notification
                      type="date"
                      content={formatDate(currentDateTime.date)}
                      size={size}
                    />
                  )}
                  <Thread
                    threadSize={size}
                    profileImageUrl={profileImageUrl}
                    createdAt={createdAt}
                    content={content}
                    isContinue={isContinue}
                    onClickImage={onClickImage}
                    {...rest}
                  />
                </Fragment>
              ) : (
                <Fragment key={id}>
                  {isFirstThreadOfDay && (
                    <Notification
                      type="date"
                      content={formatDate(currentDateTime.date)}
                      size={size}
                    />
                  )}
                  <Notification
                    type="date"
                    content={content}
                    time={currentDateTime.time}
                    size={size}
                  />
                </Fragment>
              );
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
