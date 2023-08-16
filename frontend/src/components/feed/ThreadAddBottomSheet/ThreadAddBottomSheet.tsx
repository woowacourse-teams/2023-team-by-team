import Text from '~/components/common/Text/Text';
import * as S from './ThreadAddBottomSheet.styled';
import Button from '~/components/common/Button/Button';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import { useThreadAddBottomSheet } from '~/hooks/thread/useThreadAddBottomSheet';
import { useKeydownEffect } from '~/hooks/useKeydownEffect';
import type { ThreadSize } from '~/types/size';

interface ThreadAddBottomSheetProps {
  size?: ThreadSize;
}

const ThreadAddBottomSheet = (props: ThreadAddBottomSheetProps) => {
  const { size = 'md' } = props;
  const {
    content,
    isNotice,
    isClosing,

    handlers: {
      handleClose,
      handleContentChange,
      handleIsNoticeChange,
      handleCancelButtonClick,
      handleSubmit,
    },
  } = useThreadAddBottomSheet();
  useKeydownEffect('Escape', handleClose);

  return (
    <>
      <S.Backdrop onClick={handleClose} />
      <form onSubmit={handleSubmit}>
        <S.Container isClosing={isClosing}>
          <S.TitleWrapper>
            <Text as="h3" css={S.title} size={size}>
              팀 피드 작성하기
            </Text>
            <S.NoticeWrapper>
              <Text as="span" css={S.notice} size={size}>
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
          <S.ButtonWrapper size={size}>
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
    </>
  );
};

export default ThreadAddBottomSheet;
