import type { CSSProperties } from 'react';
import Modal from '~/components/common/Modal/Modal';
import Text from '~/components/common/Text/Text';
import { useModal } from '~/hooks/useModal';
import * as S from './ScheduleModal.styled';
import { CloseIcon, DeleteIcon, EditIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import { formatDateTime } from '~/utils/formatDateTime';
import type { SchedulePosition } from '~/types/schedule';
import { useFetchScheduleById } from '~/hooks/queries/useFetchScheduleById';
import { useDeleteSchedule } from '~/hooks/queries/useDeleteSchedule';

interface ScheduleModalProps {
  scheduleId: number;
  position: SchedulePosition;
  onOpenScheduleEditModal: () => void;
}

const ScheduleModal = (props: ScheduleModalProps) => {
  const { scheduleId, position, onOpenScheduleEditModal } = props;
  const { closeModal } = useModal();
  const { scheduleById } = useFetchScheduleById(1, scheduleId);
  const { mutateDeleteSchedule } = useDeleteSchedule(1, scheduleId);

  if (scheduleById === undefined) return;

  const { title, startDateTime, endDateTime } = scheduleById;
  const { row, column, level } = position;
  const modalLocation: CSSProperties = {
    position: 'absolute',
    top: row < 3 ? `${(row + 1) * 120 + level * 18 + 60}px` : 'none',
    bottom: row >= 3 ? `${(6 - row) * 120 - level * 18}px` : 'none',
    left: column < 3 ? `${(column * 100) / 7}%` : 'none',
    right: column >= 3 ? `${((6 - column) * 100) / 7}%` : 'none',
  };

  const handleScheduleDelete = () => {
    if (confirm('일정을 삭제하시겠어요?')) {
      mutateDeleteSchedule(undefined, {
        onSuccess: () => closeModal(),
      });
    }
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
          <S.MenuContainer>
            <Button
              variant="plain"
              onClick={onOpenScheduleEditModal}
              css={S.menuIcon}
            >
              <EditIcon />
            </Button>
            <Button
              variant="plain"
              onClick={handleScheduleDelete}
              css={S.menuIcon}
            >
              <DeleteIcon />
            </Button>
            <Button variant="plain" onClick={closeModal} css={S.menuIcon}>
              <CloseIcon />
            </Button>
          </S.MenuContainer>
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
