import Modal from '~/components/common/Modal/Modal';
import { useModal } from '~/hooks/useModal';
import * as S from './ScheduleEditModal.styled';
import Button from '~/components/common/Button/Button';
import { CloseIcon } from '~/assets/svg';
import Input from '~/components/common/Input/Input';
import Text from '~/components/common/Text/Text';
import { useScheduleEditModal } from '~/hooks/schedule/useScheduleEditModal';
import type { Schedule } from '~/types/schedule';
import TeamBadge from '~/components/team/TeamBadge/TeamBadge';
import TimeTableMenu from '~/components/team_calendar/TimeTableMenu/TimeTableMenu';
import Checkbox from '~/components/common/Checkbox/Checkbox';
import { useTeamPlace } from '~/hooks/useTeamPlace';
import type { CalendarSize } from '~/types/size';

interface ScheduleEditModalProps {
  calendarSize?: CalendarSize;
  scheduleId: Schedule['id'];
  initialSchedule?: Schedule;
}

const ScheduleEditModal = (props: ScheduleEditModalProps) => {
  const { scheduleId, initialSchedule, calendarSize = 'md' } = props;
  const { closeModal } = useModal();
  const { teamPlaceColor, displayName } = useTeamPlace();

  const {
    schedule,
    times,
    isAllDay,
    handlers: {
      handleScheduleChange,
      handleScheduleSubmit,
      handleStartTimeChange,
      handleEndTimeChange,
      handleIsAllDayChange,
    },
  } = useScheduleEditModal(scheduleId, initialSchedule);

  if (initialSchedule === undefined) {
    return null;
  }

  return (
    <Modal>
      <S.Backdrop onClick={closeModal} />
      <S.Container $calendarSize={calendarSize}>
        <S.Header>
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
        <form onSubmit={handleScheduleSubmit}>
          <S.TitleWrapper>
            <Input
              width="100%"
              height="100%"
              placeholder="일정 제목"
              css={S.title}
              name="title"
              value={schedule['title']}
              required
              onChange={handleScheduleChange}
            />
          </S.TitleWrapper>

          <S.TimeSelectContainer>
            <Text size="xl" weight="semiBold">
              일정 시작
            </Text>
            <S.InputWrapper>
              <Input
                width={isAllDay ? '100%' : '50%'}
                height="40px"
                type="date"
                css={S.dateTimeLocalInput}
                name="startDate"
                value={schedule['startDate']}
                onChange={handleScheduleChange}
                required
              />
              {!isAllDay && (
                <TimeTableMenu
                  displayValue={times['startTime']}
                  onSelect={handleStartTimeChange}
                />
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.TimeSelectContainer>
            <Text size="xl" weight="semiBold">
              일정 마감
            </Text>
            <S.InputWrapper>
              <Input
                width={isAllDay ? '100%' : '50%'}
                height="40px"
                type="date"
                css={S.dateTimeLocalInput}
                name="endDate"
                value={schedule['endDate']}
                min={schedule['startDate']}
                onChange={handleScheduleChange}
                required
              />
              {!isAllDay && (
                <TimeTableMenu
                  displayValue={times['endTime']}
                  onSelect={handleEndTimeChange}
                />
              )}
            </S.InputWrapper>
          </S.TimeSelectContainer>
          <S.CheckboxContainer>
            <Text size="lg" weight="semiBold">
              종일
            </Text>
            <Checkbox isChecked={isAllDay} onChange={handleIsAllDayChange} />
          </S.CheckboxContainer>
          <S.InnerContainer>
            <S.TeamNameContainer title={displayName}>
              <TeamBadge teamPlaceColor={teamPlaceColor} size="lg" />
              <Text css={S.teamPlaceName}>{displayName}</Text>
            </S.TeamNameContainer>
            <S.ControlButtonWrapper>
              <Button variant="primary" css={S.submitButton}>
                수정
              </Button>
            </S.ControlButtonWrapper>
          </S.InnerContainer>
        </form>
      </S.Container>
    </Modal>
  );
};

export default ScheduleEditModal;
