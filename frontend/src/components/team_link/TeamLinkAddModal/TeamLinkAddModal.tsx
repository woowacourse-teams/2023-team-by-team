import { useModal } from '~/hooks/useModal';
import * as S from './TeamLinkAddModal.styled';
import Modal from '~/components/common/Modal/Modal';
import Button from '~/components/common/Button/Button';
import { CloseIcon } from '~/assets/svg';
import Text from '~/components/common/Text/Text';
import Input from '~/components/common/Input/Input';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useState,
  useRef,
} from 'react';
import { useToast } from '~/hooks/useToast';
import { useSendTeamLink } from '~/hooks/queries/useSendTeamLink';
import { useTeamPlace } from '~/hooks/useTeamPlace';

const URL_REGEX =
  /*eslint-disable-next-line*/
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

const TeamLinkAddModal = () => {
  const { teamPlaceId } = useTeamPlace();
  const { closeModal } = useModal();
  const [linkName, setLinkName] = useState('');
  const [link, setLink] = useState('');
  const linkRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const { mutateSendTeamLink } = useSendTeamLink(teamPlaceId);

  const handleLinkNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setLinkName(() => value);
  };

  const handleLinkChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setLink(() => value);
  };

  const handleTeamLinkSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!URL_REGEX.test(link)) {
      showToast('error', '올바르지 않은 링크 형식입니다.');
      linkRef.current?.focus();
      return;
    }

    mutateSendTeamLink(
      {
        title: linkName,
        url: link,
      },
      {
        onSuccess: () => {
          showToast('success', '링크가 등록되었습니다.');
          setLinkName(() => '');
          setLink(() => '');
          closeModal();
        },
      },
    );
  };

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
