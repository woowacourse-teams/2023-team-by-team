import { useState } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import * as S from './ThreadAddBottomSheet.styled';
import Button from '~/components/common/Button/Button';
import useBottomSheet from '~/hooks/useBottomSheet';
import type { ChangeEventHandler, FormEventHandler } from 'react';

const ThreadAddBottomSheet = () => {
  const [content, setContent] = useState('');
  const { handleClose, isClosing } = useBottomSheet();

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { target } = e;

    setContent(() => target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    alert(content);
  };

  return (
    <Modal>
      <S.Backdrop onClick={handleClose} />
      <form onSubmit={handleSubmit}>
        <S.Container isClosing={isClosing}>
          <Text as="h3" css={S.title}>
            팀 피드 작성하기
          </Text>
          <S.Textarea
            placeholder="내용을 입력해주세요."
            maxLength={1500}
            value={content}
            onChange={handleChange}
            required
          />
          <S.ButtonWrapper>
            <Button css={S.button}>등록</Button>
          </S.ButtonWrapper>
        </S.Container>
      </form>
    </Modal>
  );
};

export default ThreadAddBottomSheet;
