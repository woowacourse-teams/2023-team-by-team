import { useModal } from '~/hooks/useModal';
import * as S from './DailyScheduleModal.styled';
import Modal from '~/components/common/Modal/Modal';
import { CloseIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { parseDate } from '~/utils/parseDate';
import { useFetchDailySchedules } from '~/hooks/queries/useFetchDailySchedules';
import type { Position, SchedulePosition } from '~/types/schedule';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { CalendarSize } from '~/types/size';

export interface DailyScheduleModalProps {
  calendarSize?: CalendarSize;
  position: Position;
  rawDate: Date;
  calendarWidth: number;
  calendarLeft: number;
  onScheduleModalOpen: ({
    scheduleId,
    row,
    column,
    level,
  }: SchedulePosition & {
    scheduleId: number;
  }) => void;
  onSetModalType: () => void;
}

const DailyScheduleModal = (props: DailyScheduleModalProps) => {
  const {
    rawDate,
    calendarSize = 'md',
    calendarWidth,
    calendarLeft,
    position,
    onScheduleModalOpen,
    onSetModalType,
  } = props;
  const { row, column } = position;
  const { closeModal } = useModal();
  const { teamPlaceColor, teamPlaceId } = useTeamPlace();

  const { year, month, date } = parseDate(rawDate);
  const schedules = useFetchDailySchedules(teamPlaceId, year, month, date);

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container
        $css={S.modalLocation(
          row,
          column,
          calendarWidth,
          calendarLeft,
          calendarSize,
        )}
      >
        <S.Header>
          <Text>
            {month + 1}월 {date}일
          </Text>
          <Button
            variant="plain"
            type="button"
            onClick={closeModal}
            css={S.closeButton}
            aria-label="닫기"
          >
            <CloseIcon />
          </Button>
        </S.Header>
        <S.ScheduleWrapper>
          {schedules.length !== 0 ? (
            schedules.map((schedule, index) => {
              const { id, title } = schedule;

              return (
                <S.ScheduleBox
                  key={index}
                  $teamPlaceColor={teamPlaceColor}
                  title={title}
                  onClick={() => {
                    onScheduleModalOpen({
                      scheduleId: id,
                      row,
                      column,
                      level: 4,
                    });
                    onSetModalType();
                  }}
                >
                  <Text size="lg" css={S.teamName}>
                    {title}
                  </Text>
                </S.ScheduleBox>
              );
            })
          ) : (
            <Text size="lg" css={S.teamName}>
              등록된 일정이 없습니다.
            </Text>
          )}
        </S.ScheduleWrapper>
      </S.Container>
    </Modal>
  );
};

export default DailyScheduleModal;
