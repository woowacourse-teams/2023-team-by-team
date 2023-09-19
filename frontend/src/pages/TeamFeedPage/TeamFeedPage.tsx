import Button from '~/components/common/Button/Button';
import * as S from './TeamFeedPage.styled';
import { useModal } from '~/hooks/useModal';
import ThreadAddBottomSheet from '~/components/feed/ThreadAddBottomSheet/ThreadAddBottomSheet';
import { ArrowExpandMoreIcon, WriteIcon } from '~/assets/svg';
import { useEffect, useRef, useState } from 'react';
import ThreadList from '~/components/feed/ThreadList/ThreadList';
import type { ThreadSize } from '~/types/size';

interface TeamFeedPageProps {
  threadSize?: ThreadSize;
}

const TeamFeedPage = (props: TeamFeedPageProps) => {
  const { threadSize = 'md' } = props;
  const { isModalOpen, openModal } = useModal();
  const [isShowScrollTopButton, setIsShowScrollTopButton] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollTopButtonClick = () => {
    if (!ref.current) return;
    const { scrollHeight } = ref.current;

    ref.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const handleScrollBottom = () => {
      if (ref.current === null) {
        return;
      }

      const { scrollTop, scrollHeight } = ref.current;
      setIsShowScrollTopButton(() => scrollHeight - scrollTop > 100);
    };

    const current = ref.current;

    current.addEventListener('scroll', handleScrollBottom);

    return () => {
      current.removeEventListener('scroll', handleScrollBottom);
    };
  }, []);

  return (
    <S.ThreadContainer
      ref={ref}
      threadSize={threadSize}
      isModalOpen={isModalOpen}
    >
      <ThreadList containerRef={ref} size={threadSize} />
      <S.MenuButtonWrapper>
        {isShowScrollTopButton && (
          <Button
            type="button"
            variant="plain"
            aria-label="화면 하단으로 스크롤 이동하기"
            css={S.scrollTopButton}
            onClick={handleScrollTopButtonClick}
          >
            <ArrowExpandMoreIcon />
          </Button>
        )}
        <Button
          type="button"
          onClick={openModal}
          aria-label="새로운 스레드 작성하기"
        >
          <WriteIcon />
        </Button>
      </S.MenuButtonWrapper>
      <S.BottomSheetWrapper>
        {isModalOpen && <ThreadAddBottomSheet threadSize={threadSize} />}
      </S.BottomSheetWrapper>
    </S.ThreadContainer>
  );
};

export default TeamFeedPage;
