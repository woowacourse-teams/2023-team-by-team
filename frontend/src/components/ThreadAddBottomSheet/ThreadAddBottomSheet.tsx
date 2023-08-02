import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import * as S from './ThreadAddBottomSheet.styled';
import Button from '~/components/common/Button/Button';
import useBottomSheet from '~/hooks/useBottomSheet';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import { useSendNoticeThread } from '~/hooks/queries/useSendNoticeThread';
import { useSendThread } from '~/hooks/queries/useSendThread';
import { useToast } from '~/hooks/useToast';

const ThreadAddBottomSheet = () => {
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
          showToast('success', '피드가 등록되었습니다.');
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

  return (
    <Modal>
      <S.Backdrop onClick={handleClose} />
      <form onSubmit={handleSubmit}>
        <S.Container isClosing={isClosing}>
          <S.TitleWrapper>
            <Text as="h3" css={S.title}>
              팀 피드 작성하기
            </Text>
            <S.NoticeWrapper>
              <Text as="span" css={S.notice}>
                공지로 등록
              </Text>
              <Checkbox isChecked={isNotice} onChange={handleIsNoticeChange} />
            </S.NoticeWrapper>
          </S.TitleWrapper>
          <S.Textarea
            placeholder="내용을 입력해주세요."
            maxLength={1500}
            value={content}
            onChange={handleContentChange}
            required
          />
          <S.ButtonWrapper>
            <Button
              type="button"
              css={S.cancelButton}
              onClick={handleCancelButtonClick}
            >
              취소
            </Button>
            <Button css={S.submitButton}>등록</Button>
          </S.ButtonWrapper>
        </S.Container>
      </form>
    </Modal>
  );
};

export default ThreadAddBottomSheet;
