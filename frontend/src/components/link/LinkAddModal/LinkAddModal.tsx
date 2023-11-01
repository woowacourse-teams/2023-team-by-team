import * as S from './LinkAddModal.styled';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import { CloseIcon } from '~/assets/svg';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import { useRef } from 'react';
import { useTeamLinkAddModal } from '~/hooks/link/useTeamLinkAddModal';
import type { LinkSize } from '~/types/size';
import { useCheckMobileWeb } from '~/hooks/useCheckMobileWeb';

interface LinkAddModalProps {
  linkSize?: LinkSize;
}

const LinkAddModal = (props: LinkAddModalProps) => {
  const { linkSize = 'md' } = props;
  const isMobile = useCheckMobileWeb();
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
      <S.Container $linkSize={linkSize} $isMobile={isMobile}>
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
            <Text size="xl" weight="semiBold">
              링크 이름
            </Text>
            <Input
              width="100%"
              height="38px"
              placeholder="링크 이름을 입력해 주세요."
              css={S.title}
              value={linkName}
              onChange={handleLinkNameChange}
              required
            />
          </S.InputContainer>
          <S.InputContainer>
            <Text size="xl" weight="semiBold">
              링크
            </Text>
            <Input
              width="100%"
              height="38px"
              placeholder="공유할 링크를 입력해 주세요."
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

export default LinkAddModal;
