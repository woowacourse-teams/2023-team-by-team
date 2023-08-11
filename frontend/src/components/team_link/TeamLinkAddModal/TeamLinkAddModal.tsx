import { useModal } from '~/hooks/useModal';
import * as S from './TeamLinkAddModal.styled';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import { CloseIcon } from '~/assets/svg';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';

const TeamLinkAddModal = () => {
  const { closeModal } = useModal();

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
        <S.IconWrapper>
          <Button
            variant="plain"
            type="button"
            onClick={closeModal}
            css={S.closeButton}
            aria-label="일정 등록 모달 닫기"
          >
            <CloseIcon />
          </Button>
        </S.IconWrapper>
        <form>
          <S.InputContainer>
            <Text size="xxl" weight="semiBold">
              링크 이름
            </Text>
            <Input
              width="96%"
              height="36px"
              placeholder="링크 이름을 입력해주세요."
              css={S.title}
              required
            />
          </S.InputContainer>
          <S.InputContainer>
            <Text size="xxl" weight="semiBold">
              링크
            </Text>
            <Input
              width="96%"
              height="36px"
              placeholder="공유할 링크를 입력해주세요."
              css={S.title}
              required
            />
          </S.InputContainer>
          <S.ControlButtonWrapper>
            <Button variant="primary" css={S.submitButton}>
              등록
            </Button>
          </S.ControlButtonWrapper>
        </form>
      </S.Container>
    </Modal>
  );
};

export default TeamLinkAddModal;
