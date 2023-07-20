import type { CSSProperties } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import { useModal } from '~/hooks/useModal';
import * as S from './ScheduleModal.styled';
import { CloseIcon, DeleteIcon, EditIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import { formatDateTime } from '~/utils/formatDateTime';
import type { Schedule, SchedulePosition } from '~/types/schedule';

interface ScheduleModalProps {
  schedule: Schedule;
  position: SchedulePosition;
  handleScheduleDelete: () => void;
}
const ScheduleModal = (props: ScheduleModalProps) => {
  const { schedule, handleScheduleDelete, position } = props;
  const { closeModal } = useModal();

  const { id, title, startDateTime, endDateTime } = schedule;

  console.log(position);
  const modalLocation: CSSProperties = {
    position: 'absolute',
    top:
      position.row < 3
        ? `${(position.row + 1) * 120 + position.level * 18 + 60}px`
        : 'none',
    bottom:
      position.row >= 3
        ? `${(6 - position.row) * 120 - position.level * 18}px`
        : 'none',
    left: position.column < 3 ? `${(position.column * 100) / 7}%` : 'none',
    right:
      position.column >= 3 ? `${((6 - position.column) * 100) / 7}%` : 'none',
  };

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container style={modalLocation}>
        <S.Header>
          <S.TeamWrapper>
            <S.TeamColor />
            <div title={'현대사회와 범죄 5조'}>
              <Text css={S.teamName}>현대사회와 범죄 5조</Text>
            </div>
          </S.TeamWrapper>
          <S.MenuWrapper>
            <Button size="sm" variant="plain">
              <EditIcon />
            </Button>
            <Button size="sm" variant="plain" onClick={handleScheduleDelete}>
              <DeleteIcon />
            </Button>
            <Button size="sm" variant="plain" onClick={closeModal}>
              <CloseIcon />
            </Button>
          </S.MenuWrapper>
        </S.Header>
        <Text as="h4">{title}</Text>
        <S.PeriodWrapper>
          <Text size="lg">{formatDateTime(startDateTime)}</Text>
          <Text size="lg">~</Text>
          <Text size="lg">{formatDateTime(endDateTime)}</Text>
        </S.PeriodWrapper>
        <Button
          type="button"
          variant="primary"
          css={S.closeButton}
          onClick={closeModal}
        >
          확인
        </Button>
      </S.Container>
    </Modal>
  );
};

export default ScheduleModal;
