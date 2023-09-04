import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import * as S from './AccountDeleteModal.styled';
import { ACCOUNT_DELETE_CONFIRM_TEXT } from '~/constants/user';
import { useModal } from '~/hooks/useModal';
import { useAccountDeleteModal } from '~/hooks/user/useAccountDeleteModal';
import { CloseIcon } from '~/assets/svg';

const AccountDeleteModal = () => {
  const { closeModal } = useModal();
  const {
    username,
    inputValue,
    handleInputValueChange,
    isDeleteButtonDisabled,
  } = useAccountDeleteModal();

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container>
        <S.ModalHeader>
          <Button
            variant="plain"
            type="button"
            css={S.closeButton}
            onClick={closeModal}
            aria-label="회원 탈퇴 모달 닫기"
          >
            <CloseIcon />
          </Button>
        </S.ModalHeader>
        <S.ModalBody>
          <Text size="xxl" weight="bold">
            <S.Username>{username}</S.Username>님을 떠나보내야 한다니 아쉬워요.
          </Text>
          <Text size="lg">회원 탈퇴 전, 아래의 유의사항을 읽어 주세요.</Text>
          <S.WarningBox>
            <ul>
              <li>소속된 모든 팀에서 자동으로 나가집니다.</li>
              <li>회원 정보는 영구적으로 삭제되며, 복구할 수 없게 됩니다.</li>
            </ul>
          </S.WarningBox>
          <Text size="lg">
            유의사항을 모두 확인하셨고, 회원 탈퇴를 원하신다면 하단의 입력창에{' '}
            <b>{ACCOUNT_DELETE_CONFIRM_TEXT}</b>를 입력해 주세요.
          </Text>
        </S.ModalBody>
        <S.AccountDeleteForm>
          <Input
            width="100%"
            height="40px"
            placeholder={`'${ACCOUNT_DELETE_CONFIRM_TEXT}' 를 입력해 주세요.`}
            css={S.deleteConfirmInput}
            value={inputValue}
            onChange={handleInputValueChange}
            autoFocus
            required
          />
          <Button
            type="button"
            disabled={isDeleteButtonDisabled}
            css={S.accountDeleteButton}
          >
            회원 탈퇴하기
          </Button>
        </S.AccountDeleteForm>
      </S.Container>
    </Modal>
  );
};

export default AccountDeleteModal;
