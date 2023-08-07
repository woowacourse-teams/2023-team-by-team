import { useState, useEffect } from 'react';
import type { RefObject } from 'react';
import { DEFAULT_MAX_THREAD_HEIGHT } from '~/constants/feed';

/**
 * 《useThreadHeight》
 * 스레드가 확장되어 있는지의 여부를 관리할 수 있고, 이를 바탕으로 스레드가 가져야 하는 높이를 알려줍니다.
 *
 * @param threadRef - 스레드 컴포넌트의 ref
 * @param contentRef - 본문의 ref
 *
 * @returns shouldShowExpandButton - 확장/축소 버튼을 표시해야하는지의 여부
 * @returns isExpanded - 현재 스레드가 확장 상태인지의 여부
 * @returns toggleExpandButton - 확장/축소 토글을 위한 함수
 * @returns resultHeight - 스레드가 가져야 하는 높이
 */
export const useThreadHeight = (
  threadRef: RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>,
) => {
  const [threadHeight, setThreadHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!threadRef.current || !contentRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setThreadHeight(() => {
        return threadRef.current ? threadRef.current.clientHeight : 0;
      });

      setContentHeight(() => {
        return contentRef.current ? contentRef.current.clientHeight : 0;
      });
    });

    resizeObserver.observe(threadRef.current);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  });

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const getResultHeight = () => {
    if (isExpanded) {
      return contentHeight + 250;
    }

    return DEFAULT_MAX_THREAD_HEIGHT;
  };

  return {
    shouldShowExpandButton: threadHeight >= DEFAULT_MAX_THREAD_HEIGHT,
    isExpanded,
    toggleExpanded,
    resultHeight: getResultHeight(),
  };
};
