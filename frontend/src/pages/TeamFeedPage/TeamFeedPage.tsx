import type { ChangeEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/common/Button/Button';
import ThreadList from '~/components/feed/ThreadList/ThreadList';
import Text from '~/components/common/Text/Text';
import NoticeThread from '~/components/feed/NoticeThread/NoticeThread';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import { useFetchNoticeThread } from '~/hooks/queries/useFetchNoticeThread';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import theme from '~/styles/theme';
import { AirplaneIcon, ArrowExpandMoreIcon, ImageIcon } from '~/assets/svg';
import type { ThreadSize } from '~/types/size';
import * as S from './TeamFeedPage.styled';

interface TeamFeedPageProps {
  threadSize?: ThreadSize;
}

const TeamFeedPage = (props: TeamFeedPageProps) => {
  const { threadSize = 'md' } = props;
  const { teamPlaceId } = useTeamPlace();
  const { noticeThread } = useFetchNoticeThread(teamPlaceId);

  const [isNotice, setIsNotice] = useState(false);
  const [isShowScrollBottomButton, setIsShowScrollBottomButton] =
    useState(false);
  const [chatContent, setChatContent] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleIsNoticeChange = () => {
    setIsNotice((prev) => !prev);
  };

  const handleChatContentChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    setChatContent(() => e.target.value);
  };

  const handleScrollBottomButtonClick = () => {
    if (!ref.current) {
      return;
    }

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

      setIsShowScrollBottomButton(() => scrollHeight - scrollTop > 1000);
    };

    const current = ref.current;

    current.addEventListener('scroll', handleScrollBottom);

    return () => {
      current.removeEventListener('scroll', handleScrollBottom);
    };
  }, []);

  return (
    <S.Container threadSize={threadSize}>
      <S.Inner>
        <S.ThreadContainer ref={ref}>
          {noticeThread && noticeThread.id && (
            <NoticeThread
              authorName={noticeThread.authorName}
              createdAt={noticeThread.createdAt}
              content={noticeThread.content}
            />
          )}
          <S.ThreadListWrapper>
            <ThreadList containerRef={ref} size={threadSize} />
          </S.ThreadListWrapper>
          <S.MenuButtonWrapper>
            {isShowScrollBottomButton && (
              <Button
                type="button"
                variant="plain"
                aria-label="화면 하단으로 스크롤 이동하기"
                css={S.scrollBottomButton}
                onClick={handleScrollBottomButtonClick}
              >
                <ArrowExpandMoreIcon />
              </Button>
            )}
          </S.MenuButtonWrapper>
        </S.ThreadContainer>
        <form>
          <S.Textarea
            value={chatContent}
            onChange={handleChatContentChange}
            placeholder="여기에 채팅을 입력하세요."
            maxLength={10000}
            autoFocus
          />
          <S.ButtonContainer>
            <Button
              type="button"
              variant="plain"
              aria-label="이미지 업로드하기"
            >
              <ImageIcon />
            </Button>
            <div>
              <Checkbox
                isChecked={isNotice}
                onChange={handleIsNoticeChange}
                color={theme.color.PURPLE100}
                size="lg"
              />
              <Text as="span" weight="semiBold" size="lg" css={S.noticeText}>
                공지로 등록
              </Text>
              <Button variant="plain" aria-label="채팅 전송하기">
                <AirplaneIcon />
              </Button>
            </div>
          </S.ButtonContainer>
        </form>
      </S.Inner>
    </S.Container>
  );
};

export default TeamFeedPage;
