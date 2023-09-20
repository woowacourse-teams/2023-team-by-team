import type {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFetchNoticeThread } from '~/hooks/queries/useFetchNoticeThread';
import { useSendNoticeThread } from '~/hooks/queries/useSendNoticeThread';
import { useSendThread } from '~/hooks/queries/useSendThread';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import { useToast } from '~/hooks/useToast';

export const useTeamFeedPage = () => {
  const { teamPlaceId } = useTeamPlace();
  const { showToast } = useToast();

  const { noticeThread } = useFetchNoticeThread(teamPlaceId);
  const { mutateSendThread } = useSendThread(teamPlaceId);
  const { mutateSendNoticeThread } = useSendNoticeThread(teamPlaceId);

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

  const handleEnterKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      sendNewThread();
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

    sendNewThread();
  };

  const sendNewThread = async () => {
    if (chatContent.trim() === '') {
      return;
    }

    if (isNotice) {
      mutateSendNoticeThread(
        { content: chatContent },
        {
          onSuccess: () => {
            showToast('success', '공지가 등록되었습니다.');
            resetChatBox();
          },
          onError: () => {
            showToast('error', '공지 등록에 실패했습니다.');
          },
        },
      );

      return;
    }

    mutateSendThread(
      { content: chatContent },
      {
        onSuccess: () => {
          resetChatBox();
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        },
        onError: () => {
          showToast('error', '스레드 등록에 실패했습니다.');
        },
      },
    );
  };

  const resetChatBox = () => {
    setChatContent(() => '');
    setIsNotice(() => false);
  };

  const scrollToBottom = () => {
    if (!ref.current) {
      return;
    }

    const { scrollHeight } = ref.current;

    ref.current.scrollTop = scrollHeight;
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
    isShowScrollBottomButton,
    chatContent,

    handlers: {
      handleIsNoticeChange,
      handleChatContentChange,
      handleEnterKeydown,
      handleScrollBottomButtonClick,
      handleSubmit,
    },
  };
};
