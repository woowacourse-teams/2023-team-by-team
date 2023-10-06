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
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import { useToast } from '~/hooks/useToast';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { CalendarSize } from '~/types/size';

interface ScheduleModalProps {
  calendarWidth: number;
  calendarLeft: number;
  calendarSize?: CalendarSize;
  scheduleId: number;
  position: SchedulePosition;
  onOpenScheduleEditModal: () => void;
}

const ScheduleModal = (props: ScheduleModalProps) => {
  const {
    calendarWidth,
    calendarLeft,
    scheduleId,
    position,
    onOpenScheduleEditModal,
    calendarSize = 'md',
  } = props;
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { teamPlaceColor, teamPlaceId, displayName } = useTeamPlace();

  const { scheduleById } = useFetchScheduleById(teamPlaceId, scheduleId);
  const { mutateDeleteSchedule } = useDeleteSchedule(teamPlaceId, scheduleId);

  if (scheduleById === undefined) return;
  const { title, startDateTime, endDateTime } = scheduleById;
  const { row, column, level } = position;

  const handleScheduleDelete = () => {
    if (confirm('일정을 삭제하시겠어요?')) {
      mutateDeleteSchedule(undefined, {
        onSuccess: () => {
          showToast('success', '일정이 삭제되었습니다.');
          closeModal();
        },
      });
    }
  };

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container
        css={S.modalLocation(
          row,
          column,
          level,
          calendarWidth,
          calendarLeft,
          calendarSize,
        )}
      >
        <S.Header>
          <S.TeamWrapper>
            <TeamBadge teamPlaceColor={teamPlaceColor} size="lg" />
            <div title={displayName}>
              <Text css={S.teamName}>{displayName}</Text>
            </div>
          </S.TeamWrapper>
          <S.MenuContainer>
            <Button
              type="button"
              variant="plain"
              onClick={onOpenScheduleEditModal}
              css={S.menuIcon}
            >
              <EditIcon />
            </Button>
            <Button
              type="button"
              variant="plain"
              onClick={handleScheduleDelete}
              css={S.menuIcon}
            >
              <DeleteIcon />
            </Button>
            <Button
              type="button"
              variant="plain"
              onClick={closeModal}
              css={S.menuIcon}
            >
              <CloseIcon />
            </Button>
          </S.MenuContainer>
        </S.Header>
        <Text as="h4" css={S.scheduleTitleText}>
          {title}
        </Text>
        <S.PeriodWrapper>
          <time>
            <Text size="lg">{formatDateTime(startDateTime)}</Text>
          </time>
          <Text size="lg">~</Text>
          <time>
            <Text size="lg">{formatDateTime(endDateTime)}</Text>
          </time>
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
