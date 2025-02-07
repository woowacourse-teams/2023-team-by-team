import type {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFetchNoticeThread } from '~/hooks/queries/useFetchNoticeThread';
import { useImageUpload } from '~/hooks/thread/useImageUpload';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';
import type { Thread } from '~/types/feed';

interface UseTeamFeedPageParams {
  sendThreadToStomp: (thread: Thread, callback: () => void) => void;
}

export const useTeamFeedPage = (params: UseTeamFeedPageParams) => {
  const { sendThreadToStomp } = params;
  const { teamPlaceId } = useTeamPlace();
  const { showToast } = useToast();
  const { previewImages, updateImages, deleteImageByUuid, deleteAllImages } =
    useImageUpload();
  const { noticeThread } = useFetchNoticeThread(teamPlaceId);
  const [isNotice, setIsNotice] = useState(false);
  const [isShowScrollBottomButton, setIsShowScrollBottomButton] =
    useState(false);
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);
  const [chatContent, setChatContent] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const isSendingImage = false;

  const handleIsNoticeChange = () => {
    setIsNotice((prev) => !prev);
  };

  const handleImageDrawerToggle = () => {
    setIsImageDrawerOpen((prev) => !prev);
  };

  const handleChatContentChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    setChatContent(() => e.target.value);
  };

  const handleSendThread = () => {
    sendThreadToStomp(
      {
        type: isNotice ? 'notice' : 'thread',
        content: chatContent,
        imagesId: [],
      },
      () => {
        if (isNotice) {
          showToast('success', '공지가 등록되었습니다.');
        }
        console.log('채팅 감지!');
      },
    );

    deleteAllImages();
    resetChatBox();

    if (isImageDrawerOpen) {
      handleImageDrawerToggle();
    }
  };

  const handleEnterKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    // NOTE: 한글 입력 시 마지막 문자가 포함된 이벤트가 두 번 발생하는 문제를 해결하기 위해 isComposing을 체크한다.
    if (e.nativeEvent.isComposing) {
      return;
    }

    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.altKey)) {
      setChatContent((prev) => prev + '\n');

      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      handleSendThread();
    }
  };

  const handleScrollBottomButtonClick = () => {
    if (!ref.current) {
      return;
    }

    const { scrollHeight } = ref.current;

    ref.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    handleSendThread();
  };

  const resetChatBox = () => {
    setChatContent(() => '');
    setIsNotice(() => false);
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

  return {
    ref,
    noticeThread,
    isNotice,
    isImageDrawerOpen,
    isShowScrollBottomButton,
    isSendingImage,
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
  };
};
