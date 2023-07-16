import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import { useModal } from '~/hooks/useModal';
import * as S from './Schedule.styled';
import { CloseIcon, DeleteIcon, EditIcon } from '~/assets/svg';

interface ScheduleModalProps {
  id: number;
}
const ScheduleModal = (props: ScheduleModalProps) => {
  const { id } = props;

  const { closeModal } = useModal();
  return (
    <Modal>
      <S.Container>
        <S.Header>
          <S.TeamWrapper>
            <S.TeamColor />
            <Text css={S.TeamName}>
              현대사회와 범죄 5조현대사회와 범죄 5조현대사회와 범죄
              5조현대사회와 범죄 5조현대사회와 범죄 5조
            </Text>
          </S.TeamWrapper>
          <S.MenuWrapper>
            <EditIcon />
            <DeleteIcon />
            <CloseIcon onClick={closeModal} />
          </S.MenuWrapper>
        </S.Header>
      </S.Container>
      <S.Backdrop onClick={closeModal} />
    </Modal>
  );
};

export default ScheduleModal;
