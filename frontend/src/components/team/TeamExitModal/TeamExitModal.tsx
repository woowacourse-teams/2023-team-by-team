import Button from '~/components/common/Button/Button';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { useTeamExitModal } from '~/hooks/team/useTeamExitModal';
import { CloseIcon, LogoutIcon } from '~/assets/svg';
import * as S from './TeamExitModal.styled';
import { useModal } from '~/hooks/useModal';

interface TeamExitModalProps {
  onClose: () => void;
}

const TeamExitModal = (props: TeamExitModalProps) => {
  const { onClose } = props;
  const { openModal } = useModal();
  const {
    teamName,
    displayName,

    handlers: { handleTeamNameChange, handleSubmit, handleClose },
  } = useTeamExitModal(onClose);

  return (
    <>
      <Button
        type="button"
        variant="normal"
        onClick={openModal}
        css={S.exitButton}
      >
        팀 나가기
        <LogoutIcon />
      </Button>
      <Modal>
        <S.Backdrop onClick={handleClose} />
        <form onSubmit={handleSubmit}>
          <S.Container>
            <S.Header>
              <Button
                type="button"
                variant="plain"
                onClick={handleClose}
                css={S.closeButton}
              >
                <CloseIcon />
              </Button>
            </S.Header>
            <S.Body>
              <label>
                <Text as="span" size="lg">
                  팀 탈퇴를 위해{' '}
                  <Text
                    as="strong"
                    size="lg"
                    weight="semiBold"
                    css={S.strongContent}
                  >
                    {displayName}
                  </Text>
                  을(를) 입력해 주세요.
                </Text>
                <Input
                  width="340px"
                  height="40px"
                  placeholder={displayName}
                  css={S.teamNameInput}
                  autoFocus
                  required
                  value={teamName}
                  onChange={handleTeamNameChange}
                />
              </label>
              <S.ButtonContainer>
                <Button
                  type="button"
                  css={S.cancelButton}
                  onClick={handleClose}
                >
                  취소
                </Button>
                <Button
                  disabled={teamName !== displayName}
                  css={S.exitConfirmButton}
                >
                  확인
                </Button>
              </S.ButtonContainer>
            </S.Body>
          </S.Container>
        </form>
      </Modal>
    </>
  );
};

export default TeamExitModal;
