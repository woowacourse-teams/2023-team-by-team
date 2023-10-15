import Button from '~/components/common/Button/Button';
import ThreadList from '~/components/feed/ThreadList/ThreadList';
import Text from '~/components/common/Text/Text';
import NoticeThread from '~/components/feed/NoticeThread/NoticeThread';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import ThreadImageModal from '~/components/feed/ThreadImageModal/ThreadImageModal';
import { useTeamFeedPage } from '~/hooks/thread/useTeamFeedPage';
import theme from '~/styles/theme';
import { AirplaneIcon, ArrowExpandMoreIcon, ImageIcon } from '~/assets/svg';
import ImageUploadDrawer from '~/components/feed/ImageUploadDrawer/ImageUploadDrawer';
import ThumbnailList from '~/components/feed/ThumbnailList/ThumbnailList';
import type { ThreadSize } from '~/types/size';
import * as S from './TeamFeedPage.styled';
import { useModal } from '~/hooks/useModal';
import { useState } from 'react';
import type { ThreadImage } from '~/types/feed';

interface TeamFeedPageProps {
  threadSize?: ThreadSize;
}

const TeamFeedPage = (props: TeamFeedPageProps) => {
  const { threadSize = 'md' } = props;
  const {
    ref,
    noticeThread,
    isNotice,
    isImageDrawerOpen,
    isShowScrollBottomButton,
    chatContent,
    previewImages,

    handlers: {
      handleIsNoticeChange,
      handleChatContentChange,
      handleImageDrawerToggle,
      handleEnterKeydown,
      handleScrollBottomButtonClick,
      handleSubmit,
      updateImages,
      deleteImageByUuid,
    },
  } = useTeamFeedPage();
  const { isModalOpen, openModal } = useModal();
  const [modalImageInfo, setModalImageInfo] = useState<{
    images: ThreadImage[];
    selectedImage: number;
  }>({
    images: [],
    selectedImage: 0,
  });

  const handleClickImage = (images: ThreadImage[], selectedImage: number) => {
    setModalImageInfo({ images, selectedImage });
    openModal();
  };

  return (
    <S.Container>
      <S.Inner>
        <S.ThreadContainer ref={ref}>
          {noticeThread && noticeThread.id && (
            <NoticeThread
              authorName={noticeThread.authorName}
              createdAt={noticeThread.createdAt}
              content={noticeThread.content}
              images={noticeThread.images}
              onClickImage={handleClickImage}
            />
          )}
          <S.ThreadListWrapper>
            <ThreadList
              containerRef={ref}
              size={threadSize}
              onClickImage={handleClickImage}
            />
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
        <ImageUploadDrawer
          isOpen={isImageDrawerOpen}
          onClose={handleImageDrawerToggle}
        >
          <ThumbnailList
            mode="delete"
            images={previewImages}
            onChange={updateImages}
            onDelete={deleteImageByUuid}
          />
        </ImageUploadDrawer>
        <S.ThreadInputForm onSubmit={handleSubmit}>
          <S.Textarea
            value={chatContent}
            onChange={handleChatContentChange}
            onKeyDown={handleEnterKeydown}
            placeholder="여기에 채팅을 입력하세요. &#13;&#10; &#13;&#10;Shift + Enter로 새 행을 추가합니다."
            maxLength={10000}
            autoFocus
          />
          <S.ButtonContainer>
            <Button
              type="button"
              variant="plain"
              aria-label="이미지 업로드하기"
              onClick={handleImageDrawerToggle}
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
        </S.ThreadInputForm>
      </S.Inner>
      {isModalOpen && (
        <ThreadImageModal
          images={modalImageInfo.images}
          initialPage={modalImageInfo.selectedImage}
        />
      )}
    </S.Container>
  );
};

export default TeamFeedPage;
