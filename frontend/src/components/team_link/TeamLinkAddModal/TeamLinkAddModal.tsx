import * as S from './TeamLinkAddModal.styled';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import { CloseIcon } from '~/assets/svg';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { useRef } from 'react';
import { useTeamLinkAddModal } from '~/hooks/link/useTeamLinkAddModal';

const TeamLinkAddModal = () => {
  const linkRef = useRef<HTMLInputElement>(null);

  const {
    linkName,
    link,

    handlers: {
      handleClose,
      handleTeamLinkSubmit,
      handleLinkNameChange,
      handleLinkChange,
    },
  } = useTeamLinkAddModal(linkRef);

  return (
    <Modal>
      <S.Backdrop onClick={handleClose} />
      <S.Container>
        <S.IconWrapper>
          <Button
            variant="plain"
            type="button"
            onClick={handleClose}
            css={S.closeButton}
            aria-label="팀 링크 등록 모달 닫기"
          >
            <CloseIcon />
          </Button>
        </S.IconWrapper>
        <form onSubmit={handleTeamLinkSubmit}>
          <S.InputContainer>
            <Text size="xxl" weight="semiBold">
              링크 이름
            </Text>
            <Input
              width="96%"
              height="36px"
              placeholder="링크 이름을 입력해주세요."
              css={S.title}
              value={linkName}
              onChange={handleLinkNameChange}
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
              value={link}
              ref={linkRef}
              onChange={handleLinkChange}
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
