import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import * as S from './ThreadAddBottomSheet.styled';
import Button from '~/components/common/Button/Button';
import useBottomSheet from '~/hooks/useBottomSheet';

const ThreadAddBottomSheet = () => {
  const { handleClose, isClosing } = useBottomSheet();

  return (
    <Modal>
      <S.Backdrop onClick={handleClose} />
      <S.Container isClosing={isClosing}>
        <Text as="h3" css={S.title}>
          팀 피드 작성하기
        </Text>
        <S.Textarea
          placeholder="내용을 입력해주세요."
          maxLength={1500}
          required
        />
        <S.ButtonWrapper>
          <Button css={S.button}>등록</Button>
        </S.ButtonWrapper>
      </S.Container>
    </Modal>
  );
};

export default ThreadAddBottomSheet;
