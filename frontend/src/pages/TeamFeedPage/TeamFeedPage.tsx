import Button from '~/components/common/Button/Button';
import ThreadList from '~/components/feed/ThreadList/ThreadList';
import Text from '~/components/common/Text/Text';
import NoticeThread from '~/components/feed/NoticeThread/NoticeThread';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import { useTeamFeedPage } from '~/hooks/team/useTeamFeedPage';
import theme from '~/styles/theme';
import { AirplaneIcon, ArrowExpandMoreIcon, ImageIcon } from '~/assets/svg';
import type { ThreadSize } from '~/types/size';
import * as S from './TeamFeedPage.styled';

interface TeamFeedPageProps {
  threadSize?: ThreadSize;
}

const TeamFeedPage = (props: TeamFeedPageProps) => {
  const { threadSize = 'md' } = props;
  const {
    ref,
    noticeThread,
    isNotice,
    isShowScrollBottomButton,
    chatContent,

    handlers: {
      handleIsNoticeChange,
      handleChatContentChange,
      handleEnterKeydown,
      handleScrollBottomButtonClick,
      handleSubmit,
    },
  } = useTeamFeedPage();

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
        <form onSubmit={handleSubmit}>
          <S.Textarea
            value={chatContent}
            onChange={handleChatContentChange}
            onKeyDown={handleEnterKeydown}
            placeholder="여기에 채팅을 입력하세요. &#13;&#10; &#13;&#10;(Shift/Ctrl/Option) + Enter로 새 행을 추가합니다."
            maxLength={10000}
            autoFocus
          />
          <S.ButtonContainer>
            <Button
              type="button"
              variant="plain"
              aria-label="이미지 업로드하기"
              onClick={() => {
                alert('이미지 업로드 기능을 준비중이에요! :)');
              }}
            >
              <ImageIcon />
            </Button>
            <div>
              <Checkbox
                isChecked={isNotice}
                onChange={handleIsNoticeChange}
                color={theme.color.PURPLE400}
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
