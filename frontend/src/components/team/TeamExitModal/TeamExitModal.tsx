import Button from '~/components/common/Button/Button';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { Backdrop } from '~/components/feed/ThreadAddBottomSheet/ThreadAddBottomSheet.styled';
import useTeamExitModal from '~/hooks/team/useTeamExitModal';
import { CloseIcon } from '~/assets/svg';
import * as S from './TeamExitModal.styled';

const TeamExitModal = () => {
  const {
    teamName,
    handlers: { handleTeamNameChange, handleSubmit, handleClose },
  } = useTeamExitModal();

  return (
    <Modal>
      <Backdrop onClick={handleClose} />
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
              <Text as="span" css={S.exitContent}>
                팀 탈퇴를 위해 현재 선택된 팀의 이름을{' '}
                <Text as="strong" css={S.strongContent}>
                  정확히
                </Text>{' '}
                입력해 주세요.
              </Text>
              <Input
                width="340px"
                height="40px"
                placeholder="팀 이름을 입력해주세요."
                css={S.teamNameInput}
                autoFocus
                required
                value={teamName}
                onChange={handleTeamNameChange}
              />
            </label>
            <S.ButtonContainer>
              <Button type="button" css={S.cancelButton} onClick={handleClose}>
                취소
              </Button>
              <Button
                disabled={teamName.length === 0}
                css={S.exitConfirmButton}
              >
                확인
              </Button>
            </S.ButtonContainer>
          </S.Body>
        </S.Container>
      </form>
    </Modal>
  );
};

export default TeamExitModal;
