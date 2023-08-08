import { useModal } from '~/hooks/useModal';
import * as S from './DailyScheduleModal.styled';
import Modal from '~/components/common/Modal/Modal';
import { CloseIcon } from '~/assets/svg';
import Button from '~/components/common/Button/Button';
import Text from '~/components/common/Text/Text';
import { parseDate } from '~/utils/parseDate';
import { useFetchDailySchedules } from '~/hooks/queries/useFetchDailySchedules';
import type { Position, SchedulePosition } from '~/types/schedule';
import type { CSSProperties } from 'react';
import { useTeamPlace } from '~/hooks/useTeamPlace';

export interface DailyScheduleModalProps {
  position: Position;
  rawDate: Date;
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
  const { rawDate, position, onScheduleModalOpen, onSetModalType } = props;
  const { row, column } = position;
  const { closeModal } = useModal();
  const { teamPlaceColor, teamPlaceId } = useTeamPlace();

  const { year, month, date } = parseDate(rawDate);
  const schedules = useFetchDailySchedules(teamPlaceId, year, month, date);
  const modalLocation: CSSProperties = {
    top: row < 3 ? `${(row + 2) * 118}px` : 'none',
    bottom: row >= 3 ? `${(7 - row) * 120}px` : 'none',
    left: column < 3 ? `${(column * 100) / 7}%` : 'none',
    right: column >= 3 ? `${((6 - column) * 100) / 7}%` : 'none',
  };

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container style={modalLocation}>
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
                  teamPlaceColor={teamPlaceColor}
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