import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';
import { useSendNoticeThread } from '~/hooks/queries/useSendNoticeThread';
import { useSendThread } from '~/hooks/queries/useSendThread';
import useBottomSheet from '~/hooks/useBottomSheet';
import { useToast } from '~/hooks/useToast';

export const useThreadAddBottomSheet = () => {
  const [content, setContent] = useState('');
  const [isNotice, setIsNotice] = useState(false);
  const { handleClose, isClosing } = useBottomSheet();
  const { showToast } = useToast();
  const { mutateSendThread } = useSendThread(1);
  const { mutateSendNoticeThread } = useSendNoticeThread(1);

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { target } = e;

    setContent(() => target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isNotice) {
      mutateSendNoticeThread(
        { content },
        {
          onSuccess: () => {
            showToast('success', '공지가 등록되었습니다.');
            handleClose();
            setContent(() => '');
            setIsNotice(() => false);
          },
        },
      );

      return;
    }

    mutateSendThread(
      { content },
      {
        onSuccess: () => {
          showToast('success', '스레드가 등록되었습니다.');
          handleClose();
          setContent(() => '');
          setIsNotice(() => false);
        },
      },
    );
  };

  const handleIsNoticeChange = () => {
    setIsNotice((prev) => !prev);
  };

  const handleCancelButtonClick = () => {
    handleClose();
    setContent(() => '');
    setIsNotice(() => false);
  };

  return {
    content,
    isNotice,
    isClosing,

    handlers: {
      handleClose,
      handleContentChange,
      handleSubmit,
      handleIsNoticeChange,
      handleCancelButtonClick,
    },
  };
};
