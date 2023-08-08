import Button from '~/components/common/Button/Button';
import * as S from './FeedPage.styled';
import { useModal } from '~/hooks/useModal';
import ThreadAddBottomSheet from '~/components/feed/ThreadAddBottomSheet/ThreadAddBottomSheet';
import { ArrowUpIcon, WriteIcon } from '~/assets/svg';
import { useEffect, useRef, useState } from 'react';
import ThreadList from '~/components/feed/ThreadList/ThreadList';

const FeedPage = () => {
  const { isModalOpen, openModal } = useModal();
  const [isShowScrollTopButton, setIsShowScrollTopButton] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollTopButtonClick = () => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const handleScrollTop = () => {
      if (ref.current === null) {
        return;
      }

      const { scrollTop } = ref.current;

      setIsShowScrollTopButton(() => scrollTop > 700);
    };

    const current = ref.current;

    current.addEventListener('scroll', handleScrollTop);

    return () => {
      current.removeEventListener('scroll', handleScrollTop);
    };
  }, []);

  return (
    <>
      <S.ThreadContainer ref={ref}>
        <ThreadList />
        <S.MenuButtonWrapper>
          {isShowScrollTopButton && (
            <Button
              type="button"
              variant="plain"
              aria-label="화면 상단으로 스크롤 이동하기"
              css={S.scrollTopButton}
              onClick={handleScrollTopButtonClick}
            >
              <ArrowUpIcon />
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
          {isModalOpen && <ThreadAddBottomSheet />}
        </S.BottomSheetWrapper>
      </S.ThreadContainer>
    </>
  );
};

export default FeedPage;
